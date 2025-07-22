// src/models/index.js
const { Sequelize } = require("sequelize");
require("dotenv").config();
console.log("Connecting to DB with config:");
console.log({
  db: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
});
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

// Object to hold all models
const db = {};

// Sequelize instance and constructor
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.Product = require("./product")(sequelize, Sequelize.DataTypes);
db.Category = require("./category")(sequelize, Sequelize.DataTypes);
db.ProductCategory = require("./productCategory")(sequelize, Sequelize.DataTypes);

// Relationships
db.Product.belongsToMany(db.Category, {
  through: db.ProductCategory,
  foreignKey: "productId",
});
db.Category.belongsToMany(db.Product, {
  through: db.ProductCategory,
  foreignKey: "categoryId",
});

module.exports = db;
