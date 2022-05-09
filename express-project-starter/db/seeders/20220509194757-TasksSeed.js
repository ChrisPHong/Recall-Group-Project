'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Tasks', [
     {content: 'walk the dog', userId: 1, completed: true, gitRepoLink: 'https://github.com', createdAt: new Date(), updatedAt: new Date()},
     {content: 'walk the human', userId: 2, completed: true, priority: true, createdAt: new Date(), updatedAt: new Date()},
     {content: 'walk the cat', userId: 3, completed: true, dueDate: new Date(), createdAt: new Date(), updatedAt: new Date()},
     {content: 'walk the cat', userId: 4, completed: true, dueDate: new Date(), location: 'HOME', createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Tasks', null, {});
  }
};
