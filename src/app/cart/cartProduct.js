"use client";

import { removeFromCart, setCheckoutItems } from "@/Store/searchSlice";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Rating,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

const CartProduct = ({ product, checked = false, onSelect }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSelect = useCallback((event) => {
    onSelect(product.id, event.target.checked);
  }, [onSelect, product.id]);
  const handleRemove = useCallback(() => {
    dispatch(removeFromCart(product));
  }, [dispatch, product]);
  const handleOrderNow = useCallback(() => {
    dispatch(setCheckoutItems([product]));
    router.push("/order");
  }, [dispatch, product, router]);

  return (
    <Card className="p-4 rounded-xl flex gap-4 items-center border border-grey-200 hover:!shadow-[0_0_20px_rgba(0,0,0,0.25)] transition-all duration-300">
      <Checkbox
        checked={checked}
        onChange={handleSelect}
        inputProps={{ "aria-label": `Select ${product.title}` }}
      />

      <div className="relative w-[120px] h-[120px]">
        <Image
          src={product?.thumbnail || ""}
          alt={product?.title || "Product image"}
          fill
          sizes="120px"
          className="rounded-lg object-cover"
        />
      </div>

      <Box className="flex flex-col flex-1">
        <Typography variant="h6">{product.title}</Typography>
        <Typography color="text.secondary">
          {product.brand || "Generic"} | {product.category}
        </Typography>
        <Box className="flex items-center gap-2 mt-1">
          <Rating
            value={Number(product.rating || 0)}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            {product.rating}
          </Typography>
        </Box>
        <Box className="flex items-center gap-2 mt-1 flex-wrap">
          <Typography>Rs. {product.price}</Typography>
          <Chip
            size="small"
            label={product.availabilityStatus || "Available"}
            color={product.stock > 0 ? "success" : "default"}
          />
          <Typography variant="body2" color="text.secondary">
            Stock: {product.stock}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" className="mt-1">
          {product.shippingInformation}
        </Typography>

        <Box className="flex gap-2 mt-3">
          <Button
            variant="outlined"
            size="small"
            onClick={handleRemove}
          >
            Remove
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={handleOrderNow}
          >
            Order Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default memo(CartProduct);
