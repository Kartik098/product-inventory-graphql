# 🛍️ Product Inventory System - GraphQL API (Node.js + MySQL)

This is a backend system for managing products and categories, built using the **Node.js + GraphQL** stack with **Sequelize** ORM and **MySQL** database.

---

## 🔧 Features

- Create, update, delete products
- Assign multiple categories to a product
- Search by product name
- Filter by categories
- Paginated product listing
- Fully validated with error handling

---

## 📦 Tech Stack

- Node.js
- Express
- GraphQL (Apollo Server / express-graphql)
- Sequelize
- MySQL
- dotenv

---

## 🚀 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/Kartik098/product-inventory-graphql.git
cd product-inventory-graphql

Install dependencies


npm install
Create .env file

Create a .env using the values from env.example.

Set up the database

Use MySQL Workbench to create the database (e.g. inventory_db)

Run the seed script to insert default categories:

bash

node src/seed/seedCategories.js
Run the server

bash

node src/app.js
The server will be available at:
➡️ http://localhost:4000/graphql

🔍 Sample GraphQL Queries
📌 Get Products with Filters
graphql

query {
  products(page: 1, limit: 5, search: "mac", categoryIds: [1]) {
    products {
      id
      name
      categories {
        name
      }
    }
    totalCount
    totalPages
    currentPage
  }
}
➕ Create Product
graphql

mutation {
  createProduct(input: {
    name: "MacBook Air",
    description: "Lightweight laptop",
    quantity: 10,
    categoryIds: [1, 2]
  }) {
    id
    name
  }
}
🛠️ Update Product
graphql

mutation {
  updateProduct(id: 1, input: {
    name: "MacBook Pro",
    description: "Upgraded model",
    quantity: 5,
    categoryIds: [1]
  }) {
    id
    name
  }
}
❌ Delete Product
graphql

mutation {
  deleteProduct(id: 1)
}
👨‍💻 Author
Kartik Gupta


