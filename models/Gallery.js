const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gallery extends Model {}

Gallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starting_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ending_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Add a user_id column to associate galleries with users
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', 
        key: 'id', 
      },
    },
  },
  {
    sequelize,
    timestamps: true, 
    freezeTableName: true,
    underscored: true,
    modelName: 'gallery',
  }
);

module.exports = Gallery;

