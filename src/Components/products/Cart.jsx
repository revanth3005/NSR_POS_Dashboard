import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import foodSlice, {
  addItemToCart,
  removeFromCart,
} from "../../features/foodSlice";
import _ from "lodash";
import CheckoutModal from "../CheckoutModal";
import { useAddBillItemsMutation } from "../../Services/foodServiceAPI";
import ErrorBoundary from "../ErrorBoundary";

const Cart = () => {
  const cartData = useSelector((state) => state.foodItems);
  const dispatch = useDispatch();
  const { data } = cartData;

  const groupingItems = data && _.groupBy(data, "name");

  const totalAmount = data.reduce((a, b) => {
    return a + b.price;
  }, 0);

  const removeItem = (itemName) => {
    if (data) {
      const findIndex = data.findIndex((item) => item.name === itemName);
      dispatch(removeFromCart(findIndex));
    }
  };
  const addItem = (itemName) => {
    if (data) {
      const findItem = data.find((item) => item.name === itemName);
      dispatch(addItemToCart(findItem));
    }
  };
  return (
    <div className="p-4 col-md-4">
      <h3 className="text-primary text-center">Billing Item's</h3>
      {data &&
        Object.keys(groupingItems).map((item) => {
          return (
            <div key={item} className="d-flex justify-content-between">
              <div className="w-100">
                <span className="fs-4 fw-normal ">{item}</span>
              </div>
              <div className="w-100 d-flex justify-content-center">
                <span className="fs-4 fw-normal text-center">
                  {groupingItems[item].length}
                </span>
              </div>
              <div className="w-100 d-flex justify-content-end">
                <button
                  className="btn btn-outline-info"
                  onClick={() => addItem(item)}
                >
                  +
                </button>
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={() => removeItem(item)}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      <hr />
      {data.length > 0 && (
        <>
          <div className="d-flex justify-content-between">
            <span className="fs-4 fw-normal ">Total:</span>
            <span className="fs-4 fw-normal ">{totalAmount}</span>
          </div>
          <button
            className="btn btn-success mt-2"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Checkout
          </button>
          <ErrorBoundary>
            <CheckoutModal groupingItems={groupingItems} />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
};

export default Cart;
