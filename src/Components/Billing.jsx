import React from "react";
import Items from "./products/Items";
import Cart from "./products/Cart";
import ErrorBoundary from "./ErrorBoundary";

const Billing = () => {
  return (
    <div className="d-flex">
      <ErrorBoundary>
      <Items />
      </ErrorBoundary>
      <ErrorBoundary>
      <Cart />
      </ErrorBoundary>
      
    </div>
  );
};

export default Billing;
