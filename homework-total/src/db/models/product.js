module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      price: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
      type: DataTypes.STRING,
      color: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {},
  );
  Product.associate = (models) => {
    Product.belongsToMany(models.Order, {
      through: 'orderProduct',
      as: 'orders',
      foreignKey: 'productId',
      otherKey: 'orderId',
    });
  };
  return Product;
};
