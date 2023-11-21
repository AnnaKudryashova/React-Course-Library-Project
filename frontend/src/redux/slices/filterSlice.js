import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: '',
    author: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            // state can be mutated thanks to Immer library, redux slice approach
            state.title = action.payload;

            // you can also return new state as usually, traditional approach
            //return { ...state, title: action.payload };
        },
        setAuthorFilter: (state, action) => {
            state.author = action.payload;
        },
        resetFilters: (state) => {
            return initialState;
        },
    },
});

export const { setTitleFilter, setAuthorFilter, resetFilters } =
    filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;

export default filterSlice.reducer;
