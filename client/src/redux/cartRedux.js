import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart_num: 0,
    favorite_num: 0,
  },
  reducers: {
    modifyCart: (state, action) => {
      state.cart_num = action.payload;
    },
    modifyFavorite: (state, action) => {
      state.favorite_num = action.payload;
    },
  },
});

export const { modifyCart, modifyFavorite } = cartSlice.actions;
export default cartSlice.reducer;
