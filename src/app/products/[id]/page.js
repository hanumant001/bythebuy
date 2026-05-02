"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCheckoutItems } from "@/Store/searchSlice";

const DetailSkeleton = () => (
  <main className="pt-24 px-5 pb-10 max-w-6xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-6">
      <Card className="p-5">
        <Skeleton variant="rounded" height={420} />
        <Box className="flex gap-3 mt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" width={72} height={72} />
          ))}
        </Box>
      </Card>
      <Card className="p-6">
        <Skeleton variant="text" height={46} width="70%" />
        <Skeleton variant="text" height={28} width="45%" />
        <Skeleton variant="text" height={90} />
        <Skeleton variant="rounded" height={40} width={220} />
        <Box className="flex gap-3 mt-5">
          <Skeleton variant="rounded" height={42} className="flex-1" />
          <Skeleton variant="rounded" height={42} className="flex-1" />
        </Box>
      </Card>
    </div>
  </main>
);

const getOriginalPrice = (product) => {
  if (!product?.discountPercentage) return null;

  return product.price / (1 - product.discountPercentage / 100);
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.searchValue);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProduct = useCallback(async (signal) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        signal,
      });

      if (!response.ok) {
        throw new Error("Unable to load product details.");
      }

      const data = await response.json();
      setProduct(data);
      setActiveImage(data.images?.[0] || data.thumbnail || "");
    } catch (error) {
      if (error.name === "AbortError") return;

      setProduct(null);
      setErrorMessage(error.message || "Product details are unavailable.");
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);

    return () => controller.abort();
  }, [fetchProduct]);

  const isInCart = cartData?.some((item) => item?.id === product?.id);
  const originalPrice = useMemo(() => getOriginalPrice(product), [product]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (errorMessage) {
    return (
      <main className="pt-24 px-5 pb-10 max-w-3xl mx-auto">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => fetchProduct()}>
              Retry
            </Button>
          }
        >
          {errorMessage}
        </Alert>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24 px-5 pb-10 max-w-3xl mx-auto">
        <Card className="p-6 text-center">
          <Typography variant="h5" gutterBottom>
            Product not found
          </Typography>
          <Button variant="contained" onClick={() => router.push("/")}>
            Browse Products
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="pt-24 px-5 pb-10 max-w-6xl mx-auto">
      <Button variant="text" onClick={() => router.back()} className="mb-4">
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-6">
        <Card className="p-5 h-fit">
          <div className="relative w-full aspect-square rounded-xl bg-[#f5f7fb] overflow-hidden">
            <Image
              src={activeImage || product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 90vw, 460px"
              className="object-contain p-4"
              priority
            />
          </div>

          <Box className="flex gap-3 mt-4 overflow-x-auto">
            {(product.images?.length ? product.images : [product.thumbnail]).map(
              (image) => (
                <button
                  key={image}
                  type="button"
                  className={`relative w-[72px] h-[72px] shrink-0 rounded-lg border bg-[#f5f7fb] overflow-hidden ${
                    activeImage === image ? "border-[#f59e0b]" : "border-gray-200"
                  }`}
                  onClick={() => setActiveImage(image)}
                >
                  <Image
                    src={image}
                    alt={product.title}
                    fill
                    sizes="72px"
                    className="object-contain p-1"
                  />
                </button>
              ),
            )}
          </Box>
        </Card>

        <Box className="flex flex-col gap-5">
          <Card className="p-6">
            <Box className="flex flex-wrap gap-2 mb-3">
              <Chip label={product.category} className="capitalize" />
              <Chip
                label={product.availabilityStatus}
                color={product.stock > 0 ? "success" : "default"}
              />
            </Box>

            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {product.brand || "Generic"} | SKU: {product.sku}
            </Typography>

            <Box className="flex items-center gap-2 mb-3">
              <Rating
                value={Number(product.rating || 0)}
                precision={0.1}
                readOnly
              />
              <Typography color="text.secondary">
                {product.rating} ({product.reviews?.length || 0} reviews)
              </Typography>
            </Box>

            <Typography className="mb-4">{product.description}</Typography>

            <Box className="flex items-center gap-3 flex-wrap mb-4">
              <Typography variant="h4">Rs. {product.price}</Typography>
              {originalPrice ? (
                <>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    className="line-through"
                  >
                    Rs. {originalPrice.toFixed(2)}
                  </Typography>
                  <Chip
                    color="success"
                    label={`${product.discountPercentage}% off`}
                  />
                </>
              ) : null}
            </Box>

            <Box className="flex gap-2 flex-wrap mb-5">
              {product.tags?.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </Box>

            <Box className="flex gap-3 flex-col sm:flex-row">
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  if (isInCart) {
                    router.push("/cart");
                  } else {
                    dispatch(addToCart(product));
                  }
                }}
              >
                {isInCart ? "Go To Cart" : "Add to Cart"}
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={() => {
                  dispatch(setCheckoutItems([product]));
                  router.push("/order");
                }}
              >
                Order Now
              </Button>
            </Box>
          </Card>

          <Card className="p-6">
            <Typography variant="h6" gutterBottom>
              Product Details
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Typography>Stock: {product.stock}</Typography>
              <Typography>Minimum Order: {product.minimumOrderQuantity}</Typography>
              <Typography>Weight: {product.weight}</Typography>
              <Typography>
                Dimensions: {product.dimensions?.width} x{" "}
                {product.dimensions?.height} x {product.dimensions?.depth}
              </Typography>
              <Typography>{product.shippingInformation}</Typography>
              <Typography>{product.warrantyInformation}</Typography>
              <Typography>{product.returnPolicy}</Typography>
              <Typography>Barcode: {product.meta?.barcode}</Typography>
            </div>
          </Card>

          <Card className="p-6">
            <Typography variant="h6" gutterBottom>
              Reviews
            </Typography>
            <Box className="flex flex-col gap-4">
              {product.reviews?.map((review, index) => (
                <Box key={`${review.reviewerEmail}-${index}`}>
                  <Box className="flex items-center justify-between gap-3 flex-wrap">
                    <Typography className="font-medium">
                      {review.reviewerName}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                  <Typography color="text.secondary">{review.comment}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                  {index < product.reviews.length - 1 ? (
                    <Divider className="mt-4" />
                  ) : null}
                </Box>
              ))}
            </Box>
          </Card>
        </Box>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
