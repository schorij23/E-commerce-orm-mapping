//Import Expree framework, routes and sequelized configuration for db connection

const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// Create Express app and use a environment variable PORT or default 3001
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use defined routes for endpoints
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
});
