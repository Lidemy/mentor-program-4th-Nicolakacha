/* eslint-disable */

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.Category);
    }
  };
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};