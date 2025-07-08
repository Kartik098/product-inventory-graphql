module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.TEXT,
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  return Product;
};
