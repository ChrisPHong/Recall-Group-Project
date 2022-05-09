'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     {firstName: 'Walker', lastName: 'Adkins', emailAddress: 'walker@adkins.com', gitLink: 'https://www.github.com', hashedPassword: 'password', createdAt: new Date(), updatedAt: new Date()},
     {firstName: 'Conner', lastName: 'Burns', emailAddress: 'real@Conner.com', hashedPassword: 'password1', createdAt: new Date(), updatedAt: new Date()},
     {firstName: 'Patrick', lastName: 'McGinn', emailAddress: 'Patrick@didNotDefer.com', gitLink: 'https://www.github.com', hashedPassword: 'password2', createdAt: new Date(), updatedAt: new Date()},
     {firstName: 'Chris', lastName: 'Hong', emailAddress: 'Chris@hong.com', hashedPassword: 'password3', createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
