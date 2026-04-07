"use client"
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

// const products = [
//   {
//     id: 1,
//     title: "Running Shoes",
//     price: 2999,
//     image: "/products/shoes.jpg",
//   },
//   {
//     id: 2,
//     title: "Smart Watch",
//     price: 4999,
//     image: "/products/watch.jpg",
//   },
//   {
//     id: 3,
//     title: "Headphones",
//     price: 1999,
//     image: "/products/headphones.jpg",
//   },
//   {
//     id: 4,
//     title: "Backpack",
//     price: 1499,
//     image: "/products/bag.jpg",
//   },
//   {
//     id: 5,
//     title: "Running Shoes",
//     price: 2999,
//     image: "/products/shoes.jpg",
//   },
//   {
//     id: 6,
//     title: "Smart Watch",
//     price: 4999,
//     image: "/products/watch.jpg",
//   },
//   {
//     id: 7,
//     title: "Headphones",
//     price: 1999,
//     image: "/products/headphones.jpg",
//   },
//   {
//     id: 8,
//     title: "Backpack",
//     price: 1499,
//     image: "/products/bag.jpg",
//   },
//   {
//     id: 9,
//     title: "Backpack",
//     price: 1499,
//     image: "/products/bag.jpg",
//   },
// ];
const ProductGrid = () => {
const {debouncedValue} = useSelector((state) => state.searchValue)
const [products,setProducts] = useState([])
  React.useEffect(() => {
    (async () => {
      try {
        let url = `https://dummyjson.com/products/`
        if(debouncedValue){
        url =  `https://dummyjson.com/products/search?q=${debouncedValue}`
        }
      const res = await fetch(url)
        if (!res.ok) throw new Error("API Failed");
        const convertToJson = await res.json();
        setProducts(convertToJson)
        // dispatch(suggestionAPIData(convertToJson));
      } catch (error) {
        console.error("Error:", error);
        setProducts([])
        // dispatch(suggestionAPIData(convertToJson));
      }
    })();
  }, [debouncedValue]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
      {products?.products?.map((product, index) => {
        return <ProductCard key={product?.id} product={product} />;
      })}
    </div>
  );
};

export default ProductGrid;
