module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const Type = sequelize.define(
    'Type',
    {
      typeName: {
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
  Type.associate = (models) => {
    Type.hasMany(models.Product, { foreignKey: 'typeId', sourceKey: 'id' });
  };
  return Type;
};
