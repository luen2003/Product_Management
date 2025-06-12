import React, { useEffect, useState } from "react";
import axios from "axios";
import { CloudUploadOutlined } from "@ant-design/icons";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productName: "", price: "", imageUrl: null });

  useEffect(() => {
    axios
      .get("https://hiring-test.stag.tekoapis.net/api/products/management")
      .then((res) => {
        const items = res.data.data.find((d) => d.type === "ProductList")?.customAttributes?.productlist?.items || [];
        setProducts(items);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", form);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <div style={{ textAlign: "center" }}>

        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Quản lý sản phẩm</h2>
      </div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "32px" }}>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "8px" }}>
            <span style={{ color: "red", marginRight: 4 }}>*</span> Tên sản phẩm
          </label>
          <input
            name="productName"
            type="text"
            maxLength={20}
            required
            style={{ width: "100%", border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}
            value={form.productName}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "8px" }}>
            <span style={{ color: "red", marginRight: 4 }}>*</span> Giá sản phẩm
          </label>
          <input
            name="price"
            type="number"
            min={10000}
            max={100000000}
            required
            style={{ width: "100%", border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "8px" }}>Ảnh sản phẩm</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="file-upload" style={{ display: "inline-flex", alignItems: "center", backgroundColor: "#ccc", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>
              <CloudUploadOutlined style={{ marginRight: "8px" }} />
              Chọn tệp tin (tối đa 5MB)
            </label>
            <input
              id="file-upload"
              name="imageUrl"
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Tạo sản phẩm
          </button>
        </div>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
        }}
      >
        {products.map((product, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={product.imageSrc}
              alt={product.name}
              style={{
                width: "100%",
                height: "240px",
                objectFit: "contain",
                backgroundColor: "#fff",
              }}
            />
            <div style={{ padding: "16px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{product.name}</h3>
              <p style={{ fontSize: "14px" }}>{product.price.toLocaleString()} đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
