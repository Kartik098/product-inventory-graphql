# 🛍️ Product Inventory System - Fullstack (GraphQL API + React Frontend)

A fullstack inventory management system built with:

- **Node.js + Express + GraphQL** for the backend (inside `src/`)
- **React + Apollo Client** frontend (inside `frontend/`)
- **MySQL** as the database

---

## 🔧 Features

### ✅ Backend

- Create, update, delete products
- Assign multiple categories to a product
- Search by product name
- Filter by categories
- Paginated product listing
- Fully validated with error handling

### ✅ Frontend

- Product listing with pagination
- Category-based filtering
- Search bar with manual "Search" trigger
- Product creation, update, and deletion
- Built with React and Apollo Client

---

## 📁 Project Structure

product-inventory-graphql/
│
├── frontend/ # React frontend
│ ├── src/
│ └── ...
│
├── src/ # Node.js backend source code
│ ├── models/
│ ├── resolvers/
│ ├── schema/
│ └── ...
├── seed/
│ └── seedCategories.js # Initial category seeding script
├── .env.example
├── app.js
└── package.json

yaml


---

## 🚀 Setup Instructions

### 1. **Clone the repo**

```bash
git clone https://github.com/Kartik098/product-inventory-graphql.git
cd product-inventory-graphql
2. Backend Setup
bash

npm install
Create a .env file using .env.example

Set up your MySQL database (e.g. inventory_db)

Seed initial categories:

bash

node src/seed/seedCategories.js
Run the backend server:

bash

node src/app.js
Backend runs at:
➡️ http://localhost:4000/graphql

3. Frontend Setup
bash

cd frontend
npm install
npm run dev
Frontend runs at:
➡️ http://localhost:5173

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
Built with ❤️ using GraphQL, React, and MySQL