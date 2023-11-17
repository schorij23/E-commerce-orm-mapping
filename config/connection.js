require('dotenv').config();
// Import sequelize library to work with MySQL database
const Sequelize = require('sequelize');
// Create a Sequelize instance based on the JAWSDB_URL (for deployment on Heroku)
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
