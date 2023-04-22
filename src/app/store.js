import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { footItemsAPI } from "../Services/foodServiceAPI";
import foodSlice from "../features/foodSlice";

export const store = configureStore({
  reducer: {
    [footItemsAPI.reducerPath]: footItemsAPI.reducer,
    foodItems: foodSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(footItemsAPI.middleware),
});
