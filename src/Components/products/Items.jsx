import React from "react";
import { useGetFoodItemsQuery } from "../../Services/foodServiceAPI";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/foodSlice";

const Items = () => {
  const { isLoading, data, error } = useGetFoodItemsQuery();
  console.log(data);
  const dispatch = useDispatch();

  const addItem = (itemData) => {
    dispatch(addItemToCart(itemData));
  };
  if (error) {
    console.log(error);
    throw new Error("Invalid in Items Compo");
  }
  return (
    <>
      <div className="printItem p-5 col-md-8 d-flex flex-wrap justify-content-around g-3">
        {isLoading ? (
          <h1>Loading....</h1>
        ) : (
          data.map((item) => {
            return (
              <div key={item.id} className="w-25 p-2">
                <h5>
                  {item.name}{" "}
                  <span className="fs-5 fw-light">Rs {item.price}</span>
                </h5>
                <img
                  src={item.src}
                  alt=""
                  width={"100%"}
                  height={"200px"}
                  className="img-thumbnail"
                />
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => addItem(item)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Items;
