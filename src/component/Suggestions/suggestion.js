import React from "react";
import { Box, Card, List, Typography } from "@mui/material";
import "./suggestion.css";
import {
  isSuggestionSelected,
  setSearchDispatch,
  suggestionAPIData,
} from "@/Store/searchSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Suggestions = ({ suggestionAPI }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Card className="mainContainerSuggestion">
      <List>
        {suggestionAPI?.products?.map((item) => (
          <Box
            key={item.id}
            className="suggestionItem"
            onClick={() => {
              dispatch(setSearchDispatch(item.title));
              dispatch(isSuggestionSelected(true));
              router.push(`/products?SP=${encodeURIComponent(item.title)}`);
              dispatch(suggestionAPIData([]));
            }}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="suggestionImg"
            />

            <Box className="suggestionContent">
              <Typography className="title">{item.title}</Typography>
              <Typography className="price">
                Rs. {item.price} | {item.rating} rating
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.brand || item.category}
              </Typography>
            </Box>
          </Box>
        ))}
      </List>
    </Card>
  );
};

export default Suggestions;
