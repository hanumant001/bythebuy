const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
  name: "searchedValue",
  initialState: {
    value: "",
    suggestionAPI: [],
    debouncedValue: "",
    isKeyEnter: false,
    suggestionSelected: false,
    cartData: [],
    productMainList: [],
  },
  reducers: {
    setSearchDispatch: (state, actions) => {
      state.value = actions.payload;
    },
    suggestionAPIData: (state, actions) => {
      state.suggestionAPI = actions.payload;
    },
    debouncedSearch: (state, actions) => {
      state.debouncedValue = actions.payload;
    },
    keyEnter: (state, actions) => {
      state.isKeyEnter = actions.payload;
    },
    isSuggestuionSelected: (state, actions) => {
      state.suggestionSelected = actions.payload;
    },
    addToCart: (state, action) => {
      state.cartData.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.id !== action.payload.id,
      );
    },
    productMainList: (state, action) => {
      state.productMainList = action.payload;
    },
  },
});

export const {
  setSearchDispatch,
  suggestionAPIData,
  debouncedSearch,
  keyEnter,
  isSuggestuionSelected,
  addToCart,
  removeFromCart,
  productMainList,
} = searchSlice.actions;
export default searchSlice.reducer;
