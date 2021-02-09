const models = require('./SDCmodels.js');

const postHome = (req, res) => {
  const {
    decreased, dateListed, imageurl, price, beds, baths, sqft, street, zipcode, city, state_name, realtor} = req.body;

  const queryString = `INSERT INTO home_info (decreased, dateListed, imageurl, price, beds, baths, sqft, street, zipcode, city, state_name, realtor) VALUES (${decreased}, ${dateListed}, '${imageurl}', ${price}, ${beds}, ${baths}, ${sqft}, '${street}', ${zipcode}, '${city}', '${state_name}', '${realtor}');`;

  models.query(queryString, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

const getNearbyHomes = (req, res) => {
  const { home_id } = req.params;

  const queryString = `SELECT * FROM home_info WHERE zipcode IN (SELECT zipcode FROM home_info WHERE home_id = ${home_id}) ORDER BY dateListed DESC LIMIT 16;`;

  models.query(queryString, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

const getSimilarHomes = (req, res) => {
  const { home_id } = req.params;

  const queryString = `SELECT * FROM home_info INNER JOIN similar_relationships ON home_id = similar_home_id WHERE base_home_id = ${home_id} limit 16;`;

  models.query(queryString, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// const getSimilarHomes = (req, res) => {
//   const { home_id } = req.params;

//   const queryString = `SELECT * FROM home_info WHERE zipcode IN (SELECT zipcode FROM home_info WHERE home_id = ${home_id}) AND beds > ((SELECT beds FROM home_info WHERE home_id = ${home_id}) - 2) AND beds < ((SELECT beds FROM home_info WHERE home_id = ${home_id}) + 2) AND price > ((SELECT price FROM home_info WHERE home_id = ${home_id}) * .7) AND price < ((SELECT price FROM home_info WHERE home_id = ${home_id}) * 1.3);`;

//   models.query(queryString, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).json(results);
//     }
//   });
// };

module.exports = {
  postHome, getSimilarHomes, getNearbyHomes,
};
