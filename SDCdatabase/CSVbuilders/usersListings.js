const fs = require('fs');

const writeUsers = fs.createWriteStream('users_listings.csv');
writeUsers.write('users_id, home_id\n', 'utf8');

const getRandomIntInclusive = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min));

const writeUserListings = (writer, encoding, callback) => {
  let i = 10000000;

  const write = () => {
    let ok = true;

    while (i > 0 && ok) {
      i -= 1;

      if (i % 200000 === 0) {
        console.log(`${i} records written`);
      }
      const likes = getRandomIntInclusive(0, 3);
      const likedHomes = [];

      for (let j = 0; j <= likes; j += 1) {
        const randomHome = getRandomIntInclusive(1, 10000000);
        if (!likedHomes.includes(randomHome)) {
          likedHomes.push(randomHome);
        }
      }

      for (let k = 0; k < likedHomes.length; k += 1) {
        const users_id = i + 1;
        const home_id = likedHomes[k];

        const data = `${users_id},${home_id}\n`;

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

writeUserListings(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
