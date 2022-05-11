'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(250)
      },
      listId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Lists',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      completed: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      dueDate: {
        type: Sequelize.DATEONLY
      },
      priority: {
        type: Sequelize.BOOLEAN
      },
      gitRepoLink: {
        type: Sequelize.STRING(250)
      },
      location: {
        type: Sequelize.STRING(250)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};
