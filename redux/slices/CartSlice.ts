import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: any, action: any) {
      state.cartItems.push(action.payload);
    },
    updateCart(state: any, action: any) {
      state.cartItems = action.payload;
    },
    emptyCart(state: any, action: any) {
      state.cartItems = [];
    },
    setTotalPrice(state: any, action: any) {
      state.total = action.payload;
    },
  },
});

export const { addToCart, updateCart, emptyCart, setTotalPrice } =
  cartSlice.actions;

export default cartSlice.reducer;
