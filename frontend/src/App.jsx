import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <Router>
      <nav className="bg-indigo-700 p-4 shadow-md text-white flex gap-4">
      <h1 className="font-bold">Product Inventory</h1>
        <Link to="/" className="hover:underline">Product List</Link>
        <Link to="/product" className="hover:underline">Add Product</Link>
      </nav>

      <div className="">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product" element={<AddProduct />} />
    <Route path="/product/:id" element={<AddProduct />} /> {/* Edit mode */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
