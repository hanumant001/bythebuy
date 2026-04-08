"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSearchParams } from "next/navigation";

const ProductGrid = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("SP"); // 👈 key change

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "https://dummyjson.com/products";

        if (searchValue) {
          url = `https://dummyjson.com/products/search?q=${searchValue}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("API Failed");

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [searchValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;