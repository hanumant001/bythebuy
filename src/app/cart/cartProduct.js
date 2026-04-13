"use client";
import { removeFromCart } from "@/Store/searchSlice";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const CartProduct = ({ product }) => {
    const dispatch = useDispatch()
  return (
  <Card className="p-4 rounded-xl flex gap-4 items-center border border-grey-200 hover:!shadow-[0_0_20px_rgba(0,0,0,0.25)] transition-all duration-300">

  {/* Image */}
  <div className="relative w-[120px] h-[120px]">
    <Image
      src={product?.thumbnail || ""}
      alt={product.title}
      fill
      className="rounded-lg object-cover"
    />
  </div>

  {/* Details */}
  <Box className="flex flex-col flex-1">
    <Typography variant="h6">{product.title}</Typography>
    <Typography color="text.secondary">₹ {product.price}</Typography>

    {/* Actions */}
    <Box className="flex gap-2 mt-3">
      <Button
        variant="outlined"
        size="small"
        onClick={() => dispatch(removeFromCart(product))}
      >
        Remove
      </Button>

      <Button variant="contained" size="small">
        Order Now
      </Button>
    </Box>
  </Box>

</Card>
  );
};

export default CartProduct;
