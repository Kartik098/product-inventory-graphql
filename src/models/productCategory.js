module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {}, { timestamps: false });
  return ProductCategory;
};
