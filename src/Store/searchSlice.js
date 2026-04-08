const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
    name: 'searchedValue',
    initialState: {
        value :'',
        suggestionAPI:[],
        debouncedValue :'',
        isKeyEnter :false,
    },
    reducers: {
        setSearchDispatch: (state, actions) => {
            state.value = actions.payload
        },
        suggestionAPIData: (state, actions) => {
            state.suggestionAPI = actions.payload
        },
        debouncedSearch: (state, actions) => {
            state.debouncedValue = actions.payload
        },
        keyEnter: (state, actions) => {
            state.isKeyEnter = actions.payload
        },
    }
})

export const { setSearchDispatch, suggestionAPIData,debouncedSearch,keyEnter } = searchSlice.actions;
export default searchSlice.reducer