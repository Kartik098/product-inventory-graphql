const { Category } = require("../../models");

module.exports = {
  Query: {
    categories: async () => {
      try {
        return await Category.findAll();
      } catch (err) {
        throw new Error("Failed to fetch categories.");
      }
    },
  },
};
