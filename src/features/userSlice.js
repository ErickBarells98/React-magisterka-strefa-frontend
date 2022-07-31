import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            user: {},
            isLogged: false,
            loading: false
        }
    },
    reducers: {
        login: (state, action) => {
            state.value.loading = true;

            console.log(action.payload.email);

            
        }
    }
});

export default userSlice.reducer;
export const { login } = userSlice.actions;