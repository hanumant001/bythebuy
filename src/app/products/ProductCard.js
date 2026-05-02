"use client";

import { addToCart, setCheckoutItems } from "@/Store/searchSlice";
import { Box, Button, Card, Chip, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const getOriginalPrice = (product) => {
  if (!product?.discountPercentage) return null;

  return product.price / (1 - product.discountPercentage / 100);
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isInCart = useSelector((state) =>
    state.searchValue.cartData?.some((item) => item?.id === product?.id),
  );
  const originalPrice = useMemo(() => getOriginalPrice(product), [product]);
  const goToDetails = useCallback(() => {
    router.push(`/products/${product.id}`);
  }, [product.id, router]);

  const handleAddToCart = useCallback((event) => {
    event.stopPropagation();

    if (isInCart) {
      router.push("/cart");
    } else {
      dispatch(addToCart(product));
    }
  }, [dispatch, isInCart, product, router]);

  const handleOrderNow = useCallback((event) => {
    event.stopPropagation();
    dispatch(setCheckoutItems([product]));
    router.push("/order");
  }, [dispatch, product, router]);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="p-4 rounded-xl flex gap-4 items-center border border-grey hover:!shadow-[0_0_20px_rgba(0,0,0,0.25)] transition duration-300 cursor-pointer"
      onClick={goToDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          goToDetails();
        }
      }}
    >
      <div className="relative w-[250px] h-[250px] flex-col justify-center items-center">
        <Image
          src={product?.thumbnail || ""}
          alt={product?.title || "Product image"}
          fill
          sizes="250px"
          className="rounded-[10px] object-cover"
        />
      </div>

      <Box className="w-full p-2 flex flex-col gap-2">
        <Box className="flex justify-between gap-3 items-start">
          <Box>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.brand || "Generic"} | {product.category}
            </Typography>
          </Box>
          <Chip
            size="small"
            label={product.availabilityStatus || "Available"}
            color={product.stock > 0 ? "success" : "default"}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          className="line-clamp-2"
        >
          {product.description}
        </Typography>

        <Box className="flex items-center gap-2">
          <Rating
            value={Number(product.rating || 0)}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            {product.rating} ({product.reviews?.length || 0} reviews)
          </Typography>
        </Box>

        <Box className="flex items-center gap-2 flex-wrap">
          <Typography variant="h6">Rs. {product.price}</Typography>
          {originalPrice ? (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                className="line-through"
              >
                Rs. {originalPrice.toFixed(2)}
              </Typography>
              <Chip
                size="small"
                color="success"
                label={`${product.discountPercentage}% off`}
              />
            </>
          ) : null}
        </Box>

        <Box className="flex gap-2 flex-wrap">
          {product.tags?.slice(0, 3).map((tag) => (
            <Chip key={tag} size="small" variant="outlined" label={tag} />
          ))}
        </Box>

        <Typography variant="body2" color="text.secondary">
          {product.shippingInformation} | {product.warrantyInformation}
        </Typography>
        <Box className="flex justify-evenly gap-2">
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            sx={{ mt: 2 }}
          >
            {isInCart ? "Go To Cart" : "Add to Cart"}
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleOrderNow}
          >
            Order Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default memo(ProductCard);
