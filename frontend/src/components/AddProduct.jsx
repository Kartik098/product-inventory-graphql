import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useCategories } from "../api/getCategories";
import {
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from "../api/productServices";

export default function AddProduct() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const { categories, loading1 } = useCategories();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryIds: [],
  });

  const { data: productData, loading: productLoading } = useQuery(GET_PRODUCT, {
    skip: !isEdit,
    variables: { id },
  });

  const [addProduct, { loading: adding }] = useMutation(ADD_PRODUCT, {
    onCompleted: () => {
      alert("Product added!");
      navigate("/");
    },
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      alert("Product updated!");
      navigate("/");
    },
  });

  useEffect(() => {
    if (isEdit && productData?.product) {
      const prod = productData.product;
      debugger
      setFormData({
        name: prod.name,
        description: prod.description,
        quantity: prod.quantity,
        price: prod.price,
        categoryIds: prod.categories.map((c) => c.id),
      });
    } else {
        setFormData({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryIds: [],
  })
    }
  }, [productData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (catId) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(catId)
        ? prev.categoryIds.filter((id) => id !== catId)
        : [...prev.categoryIds, catId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    if (isEdit) {
      await updateProduct({ variables: { id, input } });
    } else {
      await addProduct({ variables: { input } });
    }
  };

  const isLoading = adding || updating || productLoading || loading1;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl space-y-6 max-w-2xl mx-auto border border-indigo-200"
    >
      <h2 className="text-2xl font-semibold text-indigo-600">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows="3"
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
      />

      <div className="flex gap-4">
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <p className="text-gray-700 font-medium mb-2">Select Categories</p>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-200 shadow-sm"
            >
              <input
                type="checkbox"
                checked={formData.categoryIds.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 shadow"
      >
        {isLoading ? (isEdit ? "Updating..." : "Adding...") : isEdit ? "Update" : "Add Product"}
      </button>
    </form>
  );
}
