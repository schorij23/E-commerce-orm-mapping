const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');
// Define the Category model by extending Sequelize's Model class
class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true, // Use the model's name as the table name
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
