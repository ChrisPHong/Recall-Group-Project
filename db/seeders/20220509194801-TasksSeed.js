'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Tasks', [
     {content: 'walk the dog', userId: 1, listId: 1, completed: true, gitRepoLink: 'https://github.com', createdAt: new Date(), updatedAt: new Date()},
     {content: 'walk the human', userId: 2, listId: 2, completed: true, priority: true, createdAt: new Date(), updatedAt: new Date()},
     {content: 'walk the cat', userId: 3, listId: 3, completed: true, dueDate: new Date(), createdAt: new Date(), updatedAt: new Date()},
     {content: 'walk the cat', userId: 4, listId: 4, completed: true, dueDate: new Date(), location: 'HOME', createdAt: new Date(), updatedAt: new Date()},
     {content: 'Feed livestock', userId: 5, listId: 5, completed: false, dueDate: new Date(), location: 'Farmville, TX', createdAt: new Date(), updatedAt: new Date()},
     {content: 'Milk cows', userId: 5, listId: null, completed: false, dueDate: new Date(), location: 'Farmville, TX', createdAt: new Date(), updatedAt: new Date()},
     {content: 'Fix tractor', userId: 5, listId: 7, completed: false, dueDate: new Date(), location: 'Farmville, TX', createdAt: new Date(), updatedAt: new Date()},
     {content: 'Stack hay', userId: 5, listId: 6, completed: false, dueDate: new Date(), location: 'Farmville, TX', createdAt: new Date(), updatedAt: new Date()},
     {content: 'Relax', userId: 5, listId: 5, completed: false, dueDate: new Date(), location: 'Farmville, TX', createdAt: new Date(), updatedAt: new Date()}
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
