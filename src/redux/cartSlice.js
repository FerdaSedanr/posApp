import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
    tax: 8,
  },
  reducers: {
    addProduct: (state, action) => {
      //action içinde hangisine tıklanırsa
      //onun seçildiğini gösterilir
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price;
    },
    deleteCart: (state, action) => {
      if (window.confirm("Ürünü silmek istediğinizden emin misiniz?")) {
        const findCartItem = state.cartItems.find(
          (item) => item._id === action.payload._id
        );
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.total -= action.payload.price * action.payload.quantity;
        message.success("Ürün başarıyla silindi.");
      } else {
      }
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.quantity += 1;
      state.total += cartItem.price;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= cartItem.price;
    },
    reset: (state, action) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});
export const { addProduct, deleteCart, increase, decrease, reset } =
  cartSlice.actions;
export default cartSlice.reducer;
