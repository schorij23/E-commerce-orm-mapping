const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
// Define the Category model by extending Sequelize's Tag class
class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true, // Use the model's name as the table name
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
