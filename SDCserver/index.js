const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const controllers = require('./SDCcontrollers.js');

const app = express();

app.use(express.static(path.join(__dirname, '../client', 'dist')));
app.use(cors());
app.use(express.json());

// Homes
app.post('/api/homes', controllers.postHome);
// app.delete('/api/homes/:id', controllers.getNearbyHomes);
// app.patch('/api/homes/:id', controllers.getSimilarHomes);

// Similar & Nearby Homes
app.get('/api/homes/similar/:home_id', controllers.getSimilarHomes);
app.get('/api/homes/nearby/:home_id', controllers.getNearbyHomes);

// Users
// app.get('/api/homes', controllers.getAllHomes);
// app.post('/api/homes', controllers.getAllHomes);
// app.delete('/api/homes/:id', controllers.getNearbyHomes);
// app.patch('/api/homes/:id', controllers.getSimilarHomes);

app.listen(3001, () => { console.log('Listening on Port 3001'); });
