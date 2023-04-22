import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../features/foodSlice";
import { useAddBillItemsMutation } from "../Services/foodServiceAPI";
import "./checkoutMOdal.css";
import { useReactToPrint } from "react-to-print";

const CheckoutModal = ({ groupingItems }) => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.foodItems);
  const { data } = cartData;
  const [addBill, response] = useAddBillItemsMutation(data);

  const checkoutBill = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Billing",
    onBeforeGetContent: () => {
      // Make some adjustments to the content before printing
    },
    copyStyles: true,
    pageStyle: "@page { size: statement; }",
    onBeforePrint: () => {
      console.log("sai");
      let toAdd = {
        billTime: Date.now(),
        billItems: data,
      };
      addBill(toAdd)
        .then((res) => {})
        .catch((error) => {});
      //emptying
      dispatch(resetCart());
    },
    onAfterPrint: () => {
      // Clean up after printing
    },
  });
  const totalAmount = data.reduce((a, b) => {
    return a + b.price;
  }, 0);
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Items
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div ref={componentRef}>
            <div className="modal-body">
              {data &&
                Object.keys(groupingItems).map((item) => {
                  return (
                    <div key={item} className="d-flex justify-content-between">
                      <div className="w-100">
                        <span className="fs-4 fw-normal ">{item}</span>
                      </div>
                      <div>
                        <span className="fs-4 fw-normal text-center">
                          {groupingItems[item].length}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="printD">
              <div className="d-flex justify-content-between">
                <div className="d-flex fs-4 fw-normal ">Total:</div>
                <div className="d-flex fs-4 fw-normal ">{totalAmount}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex">
              <span className="fs-4 fw-normal ">Total:</span>
              <span className="fs-4 fw-normal ">{totalAmount}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Add more
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={checkoutBill}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
