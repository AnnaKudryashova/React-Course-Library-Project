import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createBookWithId from '../../utils/createBookWithId';
const initialState = [];

export const fetchBook = createAsyncThunk('books/fetchBook', async () => {
    const res = await axios.get('http://localhost:4000/random-book');
    return res.data;
});

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload);
        },
        deleteBook: (state, action) => {
            return state.filter((book) => book.id !== action.payload);
        },
        toggleFavorite: (state, action) => {
            state.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite;
                }
            });
            // return state.map((book) =>
            //     book.id === action.payload
            //         ? { ...book, isFavorite: !book.isFavorite }
            //         : book
            // );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            if (action.payload.title && action.payload.author) {
                state.push(createBookWithId(action.payload, 'API'));
            }
        });
    },
});

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions;
// export const thunkFunction = async (dispatch, getState) => {
//     try {
//         const res = await axios.get('http://localhost:4000/random-book');
//         if (res?.data?.title && res?.data?.author) {
//             dispatch(addBook(createBookWithId(res.data, 'API')));
//         }
//     } catch (error) {
//         console.log('Error fetching random book', error);
//     }
// };

export const selectBooks = (state) => state.books;

export default booksSlice.reducer;