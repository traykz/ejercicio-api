import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../slices/searchSlice';
import authReducer from '../slices/authSlice';
import productsReducer from "../slices/productsSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        products: productsReducer
    },
});

export default store;
