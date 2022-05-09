'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('ListTasks', [
    {listId: 1, taskId:1, createdAt: new Date(), updatedAt: new Date()},
    {listId: 2, taskId:2, createdAt: new Date(), updatedAt: new Date()},
    {listId: 3, taskId:3, createdAt: new Date(), updatedAt: new Date()},
    {listId: 4, taskId:4, createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('ListTasks', null, {});
  }
};
