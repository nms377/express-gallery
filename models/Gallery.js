'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gallery = sequelize.define('Gallery', {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Gallery.belongsTo(models.User);
      }
    }
  });
  return Gallery;
};