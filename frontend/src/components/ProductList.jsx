import { useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_CATEGORIES } from "../graphql/queries";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
const [searchInput, setSearchInput] = useState("");
  const { data: categoryData } = useQuery(GET_CATEGORIES);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { page, limit: 3, search, categoryIds: selectedCategories },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch({ page, limit: 3, search, categoryIds: selectedCategories });
  }, [page]);

 
  const handleCategoryChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setSelectedCategories(options);
    setPage(1);
  };

  if (loading) return <p className="text-slate-600">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading products.</p>;

  const { products, totalPages, currentPage } = data.products;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        📦 Product Inventory
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-indigo-50 p-4 rounded shadow">
        <input
          type="text"
          placeholder="Search by name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
         
          className="w-full sm:w-1/2 px-4 py-2 border border-indigo-300 rounded shadow-sm focus:ring-2 focus:ring-indigo-400"
        />
<button
  onClick={() => setSearch(searchInput)}
  className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
  Search
</button>
        <select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          className="w-full sm:w-1/2 px-4 py-2 border border-indigo-300 rounded shadow-sm h-32 focus:ring-2 focus:ring-indigo-400"
        >
          {categoryData?.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="space-y-4">
        {products.map((prod, index) => (
          <div
            key={prod.id}
            className={`p-4 shadow-md rounded-lg border ${
              index % 2 === 0 ? "bg-white border-slate-200" : "bg-indigo-50 border-indigo-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-slate-800">{prod.name}</h3>
              <span className="text-sm text-indigo-700 font-bold">₹{prod.price}</span>
            </div>
            <p className="text-slate-600 mb-2">{prod.description}</p>
            <p className="text-sm text-slate-500">Quantity: {prod.quantity}</p>
            <div className="flex items-center justify-between mt-2">
            <p className="text-sm mt-1 text-indigo-500">
              Categories: {prod.categories.map((c) => c.name).join(", ") || "None"}
            </p>
            <button
  onClick={() => navigate(`/product/${prod.id}`)}
  className="mt-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded"
>
  Edit
</button>
</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-slate-700">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
