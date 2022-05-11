'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    gitLink: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    // added a cascade feature to delete demo user
    User.hasMany(models.List, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
    User.hasMany(models.Task, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
  };
  return User;
};
