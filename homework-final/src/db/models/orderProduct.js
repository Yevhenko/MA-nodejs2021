/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define(
    'OrderProduct',
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {},
  );
  OrderProduct.associate = (models) => {
    // associations can be defined here
  };
  return OrderProduct;
};
