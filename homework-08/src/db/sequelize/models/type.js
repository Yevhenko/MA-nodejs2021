module.exports = (sequelize, DataTypes) => {
  // eslint-disable-next-line implicit-arrow-linebreak
  const Type = sequelize.define(
    'Type',
    {
      typeName: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {},
  );
  Type.associate = (models) => {
    Type.hasMany(models.Product, { foreignKey: 'typeId', sourceKey: 'id' });
  };
  return Type;
};
