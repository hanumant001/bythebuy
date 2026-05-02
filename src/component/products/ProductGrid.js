"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Button, Card, Skeleton, Typography } from "@mui/material";
import {
  setFilteredProducts,
  setProductMainList,
  setSelectedCategory,
} from "@/Store/searchSlice";

const ProductCardSkeleton = () => (
  <Card className="p-4 rounded-xl flex flex-col gap-4">
    <Skeleton variant="rounded" height={250} />
    <Skeleton variant="text" height={32} width="80%" />
    <Skeleton variant="text" height={22} width="55%" />
    <Skeleton variant="rounded" height={34} />
    <Box className="flex gap-2">
      <Skeleton variant="rounded" height={38} className="flex-1" />
      <Skeleton variant="rounded" height={38} className="flex-1" />
    </Box>
  </Card>
);

export const ProductGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 w-full">
    {Array.from({ length: 8 }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

const ProductCard = dynamic(() => import("@/app/products/ProductCard"), {
  loading: () => <ProductCardSkeleton />,
  ssr: false,
});

const ProductGridContent = () => {
  const { filteredProducts } = useSelector((state) => state.searchValue);
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("SP");
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = useCallback(async (signal) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      let url = "https://dummyjson.com/products";

      if (searchValue) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
          searchValue,
        )}`;
      }

      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error("Unable to load products right now.");

      const data = await res.json();
      const productList = data.products || [];

      dispatch(setProductMainList(productList));
      dispatch(setFilteredProducts([]));
      dispatch(setSelectedCategory(""));
      setProducts(productList);
    } catch (err) {
      if (err.name === "AbortError") return;

      setProducts([]);
      dispatch(setProductMainList([]));
      dispatch(setFilteredProducts([]));
      setErrorMessage(err.message || "Something went wrong loading products.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, [dispatch, searchValue]);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);

    return () => controller.abort();
  }, [fetchProducts]);

  const finalProductList = filteredProducts.length
    ? filteredProducts
    : products;

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (errorMessage) {
    return (
      <Box className="w-full p-5">
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => fetchProducts()}
            >
              Retry
            </Button>
          }
        >
          {errorMessage}
        </Alert>
      </Box>
    );
  }

  if (!finalProductList.length) {
    return (
      <Box className="w-full p-5 text-center">
        <Typography color="text.secondary">No products found.</Typography>
      </Box>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
        searchValue ? "pt-10" : "p-5"
      }`}
    >
      {finalProductList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default function ProductGrid() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGridContent />
    </Suspense>
  );
}
