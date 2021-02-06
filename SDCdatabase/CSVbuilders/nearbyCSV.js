const fs = require('fs');
const db = require('../index.js');

const writeNearby = fs.createWriteStream('nearby.csv');
writeNearby.write('base_home_id,nearby_home_id\n', 'utf8');

const writeTenMillionNearby = (writer, encoding, callback) => {
  let i = 10000000;

  const write = async () => {
    let ok = true;

    while (i > 0 && ok) {
      i -= 1;

      if (i % 100000 === 0) {
        console.log(`${i} records written`);
      }
      // Base Home Info
      const baseHomeZipResults = await db.connection.query(`select zipcode, price, beds from home_info where id = ${i + 1}`);
      const { zipcode, price, beds } = baseHomeZipResults.rows[0];

      // const baseHomePriceResults = await db.connection.query(`select price from home_info where id = ${i + 1}`);
      // const { price } = baseHomePriceResults.rows[0];

      // const baseHomeBedsResults = await db.connection.query(`select beds from home_info where id = ${i + 1}`);
      // const { beds } = baseHomeBedsResults.rows[0];

      // Find Nearby Homes
      const similarHomesResults = await db.connection.query(`select id from home_info where zipcode = ${zipcode}and id != ${i + 1} and price < ${price + (price * .3)} and price > ${price - (price * .3)} and beds > ${beds - 2} and beds < ${beds + 2} limit 8`);
      const { rows } = similarHomesResults;

      const similarHomes = rows.map((val) => (val.id));

      for (let j = 0; j < similarHomes.length; j += 1) {
        const data = `${i + 1},${similarHomes[j]}\n`;
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
          // see if we should continue, or wait
          // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      }
    }

    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};

writeTenMillionNearby(writeNearby, 'utf-8', () => {
  writeNearby.end();
});