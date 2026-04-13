"use client";
import useDebounce from "@/component/Functionalities/searchHandler";
import { addToCart } from "@/Store/searchSlice";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartData } = useSelector((state) => state.searchValue);
  const isInCart = cartData?.some((item) => item?.id === product?.id);
  console.log("cartData", cartData);
   console.log("categories",product.category)
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      //   className="p-1 rounded-xl shadow-md flex-col justify-center items-center "
      className="p-4 rounded-xl flex gap-4 items-center border border-grey hover:!shadow-[0_0_20px_rgba(0,0,0,0.25)] transition duration-300"
    >
      <div className="relative w-[250px] h-[250px] flex-col justify-center items-center">
        <Image
          src={product?.thumbnail || ""}
          alt="HeroSection"
          fill
          className="rounded-[10px] object-cover"
        />
      </div>

      <Box className="w-full p-2 flex-col justify-center items-center">
        <Typography variant="h6">{product.title}</Typography>
        <Typography color="text.secondary">₹ {product.price}</Typography>
        <Box className="flex justify-evenly gap-2">
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
            sx={{ mt: 2 }}
          >
            {isInCart ? "Go To Cart" : "Add to Cart"}
          </Button>
          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Order Now
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
