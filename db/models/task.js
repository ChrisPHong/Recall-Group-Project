'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATEONLY,
    priority: DataTypes.BOOLEAN,
    gitRepoLink: DataTypes.STRING,
    location: DataTypes.STRING,
    listId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, {foreignKey: 'userId'})
    Task.belongsTo(models.List, { foreignKey: 'listId'});
  };
  return Task;
};
