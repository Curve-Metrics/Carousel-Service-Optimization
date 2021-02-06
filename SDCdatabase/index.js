const { Client } = require('pg');

const client = new Client({
  user: 'daniel',
  password: '',
  host: 'localhost',
  port: 5432,
  database: 'home_carousel',
});

client.connect()
  .then(() => console.log('Connected'))
  .catch((err) => console.log(err));

module.exports.connection = client;
