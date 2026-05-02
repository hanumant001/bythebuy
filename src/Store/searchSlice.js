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
    filteredProducts: [],
    selectedCategory: "",
    checkoutItems: [],
    orderHistory: [],
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
    isSuggestionSelected: (state, actions) => {
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
    setProductMainList: (state, action) => {
      state.productMainList = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCheckoutItems: (state, action) => {
      state.checkoutItems = action.payload;
    },
    placeOrder: (state, action) => {
      state.orderHistory.push(action.payload);
      const orderedIds = new Set(action.payload.items.map((item) => item.id));
      state.cartData = state.cartData.filter((item) => !orderedIds.has(item.id));
      state.checkoutItems = [];
    },
  },
});

export const {
  setSearchDispatch,
  suggestionAPIData,
  debouncedSearch,
  keyEnter,
  isSuggestionSelected,
  addToCart,
  removeFromCart,
  setProductMainList,
  setFilteredProducts,
  setSelectedCategory,
  setCheckoutItems,
  placeOrder,
} = searchSlice.actions;
export default searchSlice.reducer;
