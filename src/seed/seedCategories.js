// src/seed/seedCategories.js
const { sequelize, Category } = require("../models");

const categories = [
  { name: "Electronics" },
  { name: "Books" },
  { name: "Clothing" },
];

(async () => {
  try {
    await sequelize.sync(); // Optional: ensures tables exist
    await Category.bulkCreate(categories, { ignoreDuplicates: true });
    console.log("✅ Categories seeded");
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await sequelize.close();
  }
})();
