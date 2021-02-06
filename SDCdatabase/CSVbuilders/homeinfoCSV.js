const faker = require('faker');
const fs = require('fs');

const getRandomIntInclusive = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min));

const isDecreased = () => (
  Math.random() > 0.75
);

const getImageUrls = (num) => {
  // Set houseNum to num % number of house images available
  let houseNum = num % 21;
  if (houseNum === 0) {
    houseNum = 1;
  }
  const house = `https://homeimgs.s3-us-west-1.amazonaws.com/truliaHomes/${houseNum}.1.jpg`;

  return house;
};

const writeHomes = fs.createWriteStream('home_info.csv');
writeHomes.write('decreased,dateListed,imageUrl,price,beds,baths,sqft,street,zipcode,city,state_name,realtor\n', 'utf8');

const writeTenMillionHomes = (writer, encoding, callback) => {
  let i = 10000000;

  const write = () => {
    let ok = true;

    while (i > 0 && ok) {
      i -= 1;
      if (i % 200000 === 0) {
        console.log(`${i} records written`);
      }

      const decreased = isDecreased();
      const dateListed = faker.date.past().toISOString();
      const imageUrl = getImageUrls(i);
      const price = getRandomIntInclusive(100, 300) * 100000;
      const beds = getRandomIntInclusive(2, 8);
      const baths = getRandomIntInclusive(2, 8);
      const sqft = getRandomIntInclusive(4000, 10000);
      const street = faker.address.streetAddress();
      const zipcode = faker.address.zipCode('#####');
      const city = faker.address.city();
      const stateName = faker.address.stateAbbr();
      const realtor = faker.name.findName();

      const data = `${decreased},${dateListed},${imageUrl},${price},${beds},${baths},${sqft},${street},${zipcode},${city},${stateName},${realtor}\n`;

      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
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

writeTenMillionHomes(writeHomes, 'utf-8', () => {
  writeHomes.end();
});
