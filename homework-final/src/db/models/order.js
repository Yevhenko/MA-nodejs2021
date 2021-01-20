module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      status: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  // eslint-disable-next-line no-unused-vars
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
    Order.belongsToMany(models.Product, {
      through: 'orderProduct',
      as: 'products',
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  };
  return Order;
};
