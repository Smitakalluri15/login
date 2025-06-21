import React, { useState } from "react";
import { saveManualProduct, saveCSVProducts } from "../utils/localStorage";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Grocery", "Personal Care", "Clothing", "Electronics", "Other"];

export default function AddInventory() {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
    discount: "",
    category: "Grocery",
    otherCategory: "",
    date: "",
    description: "",
  });
  const [csvData, setCSVData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name || !form.price || !form.quantity || !form.date) {
      alert("❗ Name, price, quantity and date are required.");
      return false;
    }
    if (form.category === "Other" && !form.otherCategory.trim()) {
      alert("❗ Specify category when choosing 'Other'.");
      return false;
    }
    return true;
  };

  const calculateFinalPrice = (price, discount) => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (!d || isNaN(d)) return p;
    return +(p - (p * d) / 100).toFixed(2);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const finalPrice = calculateFinalPrice(form.price, form.discount);

    const product = {
      name: form.name,
      sku: form.sku?.trim() || undefined,
      price: +form.price,
      quantity: +form.quantity,
      discount: form.discount ? +form.discount : 0,
      finalPrice,
      category: form.category !== "Other" ? form.category : form.otherCategory.trim(),
      date: form.date,
      description: form.description,
    };

    saveManualProduct(product);
    alert("✅ Product added");
    setForm({
      name: "",
      sku: "",
      price: "",
      quantity: "",
      discount: "",
      category: "Grocery",
      otherCategory: "",
      date: "",
      description: "",
    });
    navigate("/inventory");
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data, meta }) => {
        const req = ["name", "quantity", "date", "category", "price"];
        for (let col of req) {
          if (!meta.fields.includes(col)) {
            alert(`❌ Missing column "${col}".`);
            return;
          }
        }

        const formatted = data.map((row) => {
          const discount = row.discount ? +row.discount : 0;
          const price = +row.price;
          const finalPrice = calculateFinalPrice(price, discount);

          return {
            name: row.name,
            sku: row.sku?.trim() || undefined,
            quantity: +row.quantity,
            price,
            discount,
            finalPrice,
            category: CATEGORIES.slice(0, 4).includes(row.category) ? row.category : "Other",
            date: row.date,
            description: row.description || "",
          };
        });

        setCSVData(formatted);
        alert("✅ CSV ready: click import to save");
      },
      error: (err) => alert("❌ CSV error: " + err.message),
    });
  };

  const handleCSVSave = () => {
    saveCSVProducts(csvData);
    alert("✅ Products imported");
    setCSVData(null);
    navigate("/inventory");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-6">
        ➕ Add Inventory
      </h1>

      <form onSubmit={handleManualSubmit} className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow space-y-4">
        {["name", "price", "quantity", "date"].map((k) => (
          <div key={k}>
            <label className="block mb-1 capitalize">{k}</label>
            <input
              name={k}
              type={k === "date" ? "date" : k === "quantity" || k === "price" ? "number" : "text"}
              value={form[k]}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600"
              required
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">SKU (optional)</label>
          <input name="sku" value={form.sku} onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
        </div>

        <div>
          <label className="block mb-1">Discount % (optional)</label>
          <input name="discount" type="number" value={form.discount} onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
        </div>

        <div>
          <label className="block mb-1">Description (optional)</label>
          <input name="description" value={form.description} onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
        </div>

        <div>
          <label className="block mb-1">Category *</label>
          <select name="category" value={form.category} onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded border border-gray-600">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {form.category === "Other" && (
          <div>
            <label className="block mb-1">Specify "Other"</label>
            <input name="otherCategory" value={form.otherCategory} onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600" required />
          </div>
        )}

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">✅ Add Product</button>
      </form>

      {/* CSV Upload Section */}
      <div className="mt-12 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">📄 Upload CSV</h2>
        <p className="text-gray-400 text-sm">
          Required: <strong>name, quantity, date, category, price</strong>. Optional: sku, discount, description.
        </p>
        <input type="file" accept=".csv" onChange={handleCSVUpload}
          className="w-full p-2 bg-gray-700 rounded border border-gray-600" />
        {csvData && (
          <button onClick={handleCSVSave} className="w-full bg-green-600 hover:bg-green-700 py-2 rounded">
            ✅ Import CSV
          </button>
        )}
      </div>
    </div>
  );
}
