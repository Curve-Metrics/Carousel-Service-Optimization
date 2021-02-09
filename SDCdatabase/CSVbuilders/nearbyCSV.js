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
      const baseHomeZipResults = await db.connection.query(`select zipcode from home_info where id = ${i + 1}`);
      const { zipcode } = baseHomeZipResults.rows[0];

      // Find Nearby Homes
      const nearbyHomesResults = await db.connection.query(`select id from home_info where zipcode = ${zipcode} and id != ${i + 1} and  limit 8`);
      const { rows } = nearbyHomesResults;

      const nearbyHomes = rows.map((val) => (val.id));

      for (let j = 0; j < nearbyHomes.length; j += 1) {
        const data = `${i + 1},${nearbyHomes[j]}\n`;
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
