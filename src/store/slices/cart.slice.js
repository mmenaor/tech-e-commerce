import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';
import { getPurchases } from './purchases.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCart = (productToCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", productToCart, getConfig())
        .then(() => {
            dispatch(getCart());
            alert("Product added successfully!");
        })
        .catch(error => {
            console.log(error.response);
            alert("Something is wrong");
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteItem = (itemId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${itemId}`, getConfig())
        .then(() => dispatch(getCart()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const buyItems = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => {
            dispatch(setCart([]));
            dispatch(getPurchases());
        })
        .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;
