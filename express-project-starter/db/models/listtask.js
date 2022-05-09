'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListTask = sequelize.define('ListTask', {
    listId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {});
  ListTask.associate = function(models) {
    // associations can be defined here
  };
  return ListTask;
};