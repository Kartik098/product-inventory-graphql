// src/graphql/resolvers/productResolver.js
const { Product, Category } = require("../../models");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    product: async (_, { id }) => {
  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      through: { attributes: [] },
    },
  });
  if (!product) throw new Error("Product not found");
  return product;
},
    products: async (_, { page = 1, limit = 10, search, categoryIds }) => {
  const offset = (page - 1) * limit;
  const whereClause = {};

  if (search) {
    whereClause.name = { [Op.like]: `%${search}%` };
  }

  const include = [
    {
      model: Category,
      where: categoryIds?.length
        ? { id: { [Op.in]: categoryIds } }
        : undefined,
      through: { attributes: [] },
      required: !!categoryIds?.length,
    },
  ];

  const { count, rows } = await Product.findAndCountAll({
    where: whereClause,
    include,
    offset,
    limit,
    order: [["createdAt", "DESC"]],
    distinct: true, // important to get accurate count with includes
  });

  return {
    products: rows,
    totalCount: count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
},
  },

  Mutation: {
    addProduct: async (_, { input }) => {
      const { name, description, quantity, categoryIds, price } = input;
 if (!name || !description || quantity == null || price == null) {
    throw new Error("All fields except categories are required.");
  }
      // Check if name already exists
      const existing = await Product.findOne({ where: { name } });
      if (existing) {
        throw new Error("Product with this name already exists");
      }

      const product = await Product.create({ name, description, quantity, price });

      if (categoryIds && categoryIds.length > 0) {
        await product.setCategories(categoryIds);
      }

      return product;
    },
    updateProduct: async (_, { id, input }) => {
  const { name, description, quantity, categoryIds, price } = input;
        
  // Check if product exists
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found");

  // Check for duplicate name (other than itself)
  const existing = await Product.findOne({ where: { name } });
  if (existing && existing.id !== parseInt(id)) {
    throw new Error("Another product with this name already exists");
  }

  // Update basic fields
  await product.update({ name, description, quantity, price });

  // Update categories
  if (categoryIds && categoryIds.length > 0) {
    await product.setCategories(categoryIds);
  }

  return product;
},
    deleteProduct: async (_, { id }) => {
      const deleted = await Product.destroy({ where: { id } });
      
    if (deleted === 0) {
      throw new Error(`No product found with ID ${id} to delete.`);
    }
      return deleted > 0;
    },
  },

  Product: {
    categories: async (product) => {
      return await product.getCategories();
    },
  },
};
