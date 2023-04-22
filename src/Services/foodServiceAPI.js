import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const footItemsAPI = createApi({
  reducerPath: "foodItemAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pos-services.onrender.com" }),
  endpoints: (builder) => ({
    getFoodItems: builder.query({
      query: () => "/foodItems",
    }),
    getBillItems: builder.query({
      query: () => "/billedItems",
    }),
    addBillItems: builder.mutation({
      query: (payload) => ({
        url: "/billedItems",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetFoodItemsQuery, useAddBillItemsMutation,useGetBillItemsQuery } = footItemsAPI;
