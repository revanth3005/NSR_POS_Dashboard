import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};


const foodSlice = createSlice({
  name: "foodItems",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.data.push({ ...action.payload });
    },
    removeFromCart: (state, action) => {
      state.data.splice(action.payload, 1);
    },
    resetCart: (state, action) => {
      state.data = [];
    },
  },
});
export const { addItemToCart, removeFromCart,resetCart } = foodSlice.actions;

export default foodSlice.reducer;
