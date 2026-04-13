"use client";
import { chipData } from "@/data/dummyData2";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const Chips = ({ chipList }) => {
  const handleClick = (chip) => {
    const filterProducts = chipList?.filter(
      (item) => item.category === chip?.category,
    );
    console.log("filterProducts", filterProducts);
  };

  const uniqueCategory = [
    ...new Map(chipList?.map((item) => [item.category, item])).values(),
  ];
  //   console.log("uniqueCategory", uniqueCategory);
  return (
    <Stack direction="row" spacing={1}>
      {uniqueCategory?.map((item) => (
        <Chip
          key={item.id}
          label={`${item.category}`}
          onClick={() => {
            handleClick(item);
          }}
          variant="outlined"
        />
      ))}
    </Stack>
  );
};
const Category = () => {
  const { productMainList } = useSelector((state) => state.searchValue);

  return (
    <main className="w-full p-10">
      <Box flex className="flex justify-between items-center">
        <Typography>Category</Typography>
        <Button>View All</Button>
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
        "Loading"
      )}
    </main>
  );
};

export default Category;
