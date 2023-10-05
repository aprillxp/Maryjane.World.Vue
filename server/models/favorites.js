'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorites.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Favorites.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    overview: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    date: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    imdbId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};