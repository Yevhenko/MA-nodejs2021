module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {},
  );
  Product.associate = (models) => {
    Product.belongsTo(models.Type, { foreignKey: 'typeId', targetKey: 'id' });
    Product.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id' });
  };
  return Product;
};
