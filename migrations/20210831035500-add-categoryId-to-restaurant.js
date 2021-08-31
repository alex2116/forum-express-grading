'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Restaurants', 'CategoryId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // 維護舊資料
    await queryInterface.bulkUpdate('Restaurants',
      {
        CategoryId: 1, // 預設為 1, 假設 Categories 有 id 1 的資料
      },
      {}
    );

    // 加 Constraint
    await queryInterface.addConstraint('Restaurants', {
      fields: ['CategoryId'],
      type: 'foreign key',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'cascade', // 這自行學習是做什麼的
      onUpdate: 'cascade'  // 這自行學習是做什麼的
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Restaurants', 'CategoryId')
  }
};
