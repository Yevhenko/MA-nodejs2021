module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const Color = sequelize.define(
    'Color',
    {
      colorName: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {},
  );
  Color.associate = (models) => {
    Color.hasMany(models.Product, { foreignKey: 'colorId', sourceKey: 'id' });
  };
  return Color;
};
