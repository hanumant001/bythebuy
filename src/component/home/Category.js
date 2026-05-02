"use client";
import { setFilteredProducts, setSelectedCategory } from "@/Store/searchSlice";
import { Box, Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const Chips = ({ chipList }) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.searchValue);
  const handleClick = (chip) => {
    const filterProducts = chipList?.filter(
      (item) => item.category === chip?.category,
    );
    dispatch(setFilteredProducts(filterProducts));
    dispatch(setSelectedCategory(chip?.category));
  };

  const uniqueCategory = [
    ...new Map(chipList?.map((item) => [item.category, item])).values(),
  ];

  return (
    <Stack direction="row" spacing={1}>
      {uniqueCategory?.map((item) => (
        <Chip
          key={item.id}
          label={`${item.category}`}
          color={selectedCategory === item.category ? "success" : "default"}
          variant={selectedCategory === item.category ? "filled" : "outlined"}
          onClick={() => {
            handleClick(item);
          }}
        />
      ))}
    </Stack>
  );
};
const Category = () => {
  const { productMainList } = useSelector((state) => state.searchValue);
  const dispatch = useDispatch();
  const handleViewAll = () => {
    dispatch(setFilteredProducts([]));
    dispatch(setSelectedCategory(""));
  };

  return (
    <main className="w-full p-10">
      <Box flex className="flex justify-between items-center">
        <Typography>Category</Typography>
        <Button onClick={handleViewAll}>View All</Button>
      </Box>
      {productMainList?.length ? (
        <Box
          className="width-[full] overflow-y-hidden"
          sx={{
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Chips chipList={productMainList} />
        </Box>
      ) : (
        <Stack direction="row" spacing={1} className="mt-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" width={92} height={32} />
          ))}
        </Stack>
      )}
    </main>
  );
};

export default Category;
