module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const Color = sequelize.define(
    'Color',
    {
      colorName: {
        type: DataTypes.STRING,
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
  Color.associate = (models) => {
    Color.hasMany(models.Product, { foreignKey: 'colorId', sourceKey: 'id' });
  };
  return Color;
};
