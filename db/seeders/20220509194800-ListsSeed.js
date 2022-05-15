'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Lists', [
     {name: 'Things', userId: 1, createdAt: new Date(), updatedAt: new Date()},
     {name: 'Fun Things to do', userId: 2, createdAt: new Date(), updatedAt: new Date()},
     {name: 'Traveling', userId: 3, createdAt: new Date(), updatedAt: new Date()},
     {name: 'Things2', userId: 4, createdAt: new Date(), updatedAt: new Date()},
     {name: 'Work', userId: 5, createdAt: new Date(), updatedAt: new Date()},
     {name: 'Personal', userId: 5, createdAt: new Date(), updatedAt: new Date()},
     {name: 'Leisure', userId: 5, createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Lists', null, {});
  }
};
