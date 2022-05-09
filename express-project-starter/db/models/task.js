'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATEONLY,
    priority: DataTypes.BOOLEAN,
    gitRepoLink: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, {foreignKey: 'userId'})
    const columnMapping = {
      through: 'ListTask',
      otherkey: 'listId',
      foreignKey: 'taskId'
    }
    Task.belongsToMany(models.List, columnMapping)
  };
  return Task;
};
