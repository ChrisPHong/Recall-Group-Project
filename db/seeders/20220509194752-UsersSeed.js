'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     {firstName: 'Walker', lastName: 'Adkins', emailAddress: 'walker@adkins.com', gitLink: 'https://www.github.com', hashedPassword: '$2a$12$ckOEwmQuCFlCjig5xNuxGe1iYJZia1qX0/Zd860K23Bal0.7PFsyu', createdAt: new Date(), updatedAt: new Date()},
     {firstName: 'Conner', lastName: 'Burns', emailAddress: 'real@Conner.com', hashedPassword: '$2a$12$ckOEwmQuCFlCjig5xNuxGe1iYJZia1qX0/Zd860K23Bal0.7PFsyu', createdAt: new Date(), updatedAt: new Date()},
     {firstName: 'Patrick', lastName: 'McGinn', emailAddress: 'Patrick@didNotDefer.com', gitLink: 'https://www.github.com', hashedPassword: '$2a$12$ckOEwmQuCFlCjig5xNuxGe1iYJZia1qX0/Zd860K23Bal0.7PFsyu', createdAt: new Date(), updatedAt: new Date()},
     {firstName: 'Chris', lastName: 'Hong', emailAddress: 'Chris@hong.com', hashedPassword: '$2a$12$ckOEwmQuCFlCjig5xNuxGe1iYJZia1qX0/Zd860K23Bal0.7PFsyu', createdAt: new Date(), updatedAt: new Date()},
     {firstName: 'Big Bob', lastName: 'Evans', emailAddress: 'demo@demo.demo', hashedPassword: '$2a$12$ckOEwmQuCFlCjig5xNuxGe1iYJZia1qX0/Zd860K23Bal0.7PFsyu', createdAt: new Date(), updatedAt: new Date()}
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
