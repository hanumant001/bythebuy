"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CartProduct from "./cartProduct";
import { useSelector } from "react-redux";

const CartMain = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("SP");
  const { cartData } = useSelector((state) => state.searchValue);
  const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         let url = "https://dummyjson.com/products";

  //         if (searchValue) {
  //           url = `https://dummyjson.com/products/search?q=${searchValue}`;
  //         }

  //         const res = await fetch(url);
  //         if (!res.ok) throw new Error("API Failed");

  //         const data = await res.json();
  //         setProducts(data.products);
  //       } catch (err) {
  //         console.error(err);
  //         setProducts([]);
  //       }
  //     };

  //     fetchProducts();
  //   }, [searchValue]);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 pt-24 p-5`}
    >
      {cartData?.map((product) => (
        <CartProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CartMain;
