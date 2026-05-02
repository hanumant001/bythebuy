"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Typography,
} from "@mui/material";
import { setCheckoutItems } from "@/Store/searchSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const CartProductSkeleton = () => (
  <Card className="p-4 rounded-xl flex gap-4 items-center">
    <Skeleton variant="rounded" width={24} height={24} />
    <Skeleton variant="rounded" width={120} height={120} />
    <Box className="flex flex-col gap-2 flex-1">
      <Skeleton variant="text" height={30} width="70%" />
      <Skeleton variant="text" height={22} width="45%" />
      <Skeleton variant="rounded" height={32} width="60%" />
    </Box>
  </Card>
);

const CartProduct = dynamic(() => import("./cartProduct"), {
  loading: () => <CartProductSkeleton />,
  ssr: false,
});

const CartMain = () => {
  const { cartData } = useSelector((state) => state.searchValue);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  useEffect(() => {
    setSelectedProductIds((currentIds) =>
      currentIds.filter((id) => cartData.some((product) => product.id === id)),
    );
  }, [cartData]);

  const selectedProducts = useMemo(
    () =>
      cartData.filter((product) => selectedProductIds.includes(product.id)),
    [cartData, selectedProductIds],
  );

  const isAllSelected =
    Boolean(cartData.length) && selectedProductIds.length === cartData.length;

  const handleSelectAll = useCallback((event) => {
    if (event.target.checked) {
      setSelectedProductIds(cartData.map((product) => product.id));
      return;
    }

    setSelectedProductIds([]);
  }, [cartData]);

  const handleSelectProduct = useCallback((productId, isSelected) => {
    setSelectedProductIds((currentIds) => {
      if (isSelected) {
        return [...new Set([...currentIds, productId])];
      }

      return currentIds.filter((id) => id !== productId);
    });
  }, []);

  const handleCheckoutCart = useCallback(() => {
    dispatch(setCheckoutItems(selectedProducts));
    router.push("/order");
  }, [dispatch, router, selectedProducts]);

  return (
    <main className="pt-24 p-5">
      <Box className="flex justify-between items-center mb-5 gap-4">
        <Typography variant="h5">Cart</Typography>
        <Button
          variant="contained"
          disabled={!selectedProducts.length}
          onClick={handleCheckoutCart}
        >
          Checkout Selected
        </Button>
      </Box>

      {cartData?.length ? (
        <>
          <Box className="flex justify-between items-center mb-4 gap-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={
                    selectedProductIds.length > 0 &&
                    selectedProductIds.length < cartData.length
                  }
                  onChange={handleSelectAll}
                />
              }
              label="Select all"
            />
            <Typography color="text.secondary">
              {selectedProductIds.length} selected
            </Typography>
          </Box>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {cartData.map((product) => (
              <CartProduct
                key={product.id}
                product={product}
                checked={selectedProductIds.includes(product.id)}
                onSelect={handleSelectProduct}
              />
            ))}
          </div>
        </>
      ) : (
        <Typography color="text.secondary">Your cart is empty.</Typography>
      )}
    </main>
  );
};

export default CartMain;
