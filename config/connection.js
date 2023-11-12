require('dotenv').config();

const Sequelize = require('sequelize');
// JAWSDB heroku add on https://devcenter.heroku.com/articles/jawsdb
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });
// should there be a PORT?? there is a port in server.js
module.exports = sequelize;
