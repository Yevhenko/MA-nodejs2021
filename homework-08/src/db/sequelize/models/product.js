module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      price: DataTypes.DECIMAL,
      quantity: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER,
      colorId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {},
  );
  Product.associate = (models) => {
    Product.belongsTo(models.Type, { foreignKey: 'typeId', targetKey: 'id' });
    Product.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id' });
  };
  return Product;
};
