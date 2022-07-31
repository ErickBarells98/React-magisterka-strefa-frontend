import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './userSlice';

const ProviderWrapper = ({children}) => {
    
    //react query z zaciaganiem ziomeczka z cookiesów na podstawie refreshTokena.

    const store = configureStore({
        reducer: {
            user: userReducer,
        }
    })

    const isLoading = false;

    return (
        <Provider store={store}>
            {!isLoading && children}
        </Provider>
    )
}

export default ProviderWrapper