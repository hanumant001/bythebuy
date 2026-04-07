const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
    name: 'searchedValue',
    initialState: {
        value :'',
        suggestionAPI:[],
        debouncedValue :''
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
    }
})

export const { setSearchDispatch, suggestionAPIData,debouncedSearch } = searchSlice.actions;
export default searchSlice.reducer