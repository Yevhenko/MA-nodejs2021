/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('OrderProduct', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        references: {
          model: {
            tableName: 'Orders',
          },
          key: 'id',
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
        references: {
          model: {
            tableName: 'Products',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('OrderProduct'),
};
