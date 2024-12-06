import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    searchHistory: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            if (action.payload && !state.searchHistory.includes(action.payload)) {
                state.searchHistory.push(action.payload);
            }
        },
        clearSearchHistory(state) {
            state.searchHistory = [];
        },
    },
});

export const { setSearchTerm, clearSearchHistory } = searchSlice.actions;
export default searchSlice.reducer;
