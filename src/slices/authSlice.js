import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            state.isLogged = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLogged = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
