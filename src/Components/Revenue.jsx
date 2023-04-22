import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

const Revenue = () => {
  const [data, setData] = useState([]);
  const [prices, setPrices] = useState({});
  const [load, setLoad] = useState(false);
  const getBillItemsOnly =
    data &&
    data.reduce((a, b) => {
      return [...a, ...b["billItems"]];
    }, []);

  const totalGross =
    getBillItemsOnly &&
    getBillItemsOnly.reduce((a, b) => {
      return a + b.price;
    }, 0);
  useEffect(() => {
    setLoad(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pos-services.onrender.com/billedItems"
        );
        console.log("retrieved data", response.status, response.statusText);
        setData(response.data);
        setLoad(true);
      } catch (error) {
        console.log(error);
        setLoad(false);
      }
      // for prices
      try {
        const response = await axios.get(
          "https://pos-services.onrender.com/prices"
        );
        setPrices(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const groupingData = _.groupBy(getBillItemsOnly, "name");
  const handleData = async () => {
    for await (const item of data) {
      try {
        const res = await axios.delete(
          `https://pos-services.onrender.com/foodItems/${item.id}`
        );
        console.log(
          "API data deleted successfully",
          res.status,
          res.statusText
        );
      } catch (error) {
        console.error("Error deleting API data:", error);
      }
    }
  };
  const date = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const uiDate = date.toLocaleDateString("en-US", options);
    return uiDate;
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center">
          Revenue on <span className="fs-4 fw-normal">{date()}</span>{" "}
        </h2>
        <div className="col-md-12">
          {!load ? (
            <>
              <div
                className="spinner-grow"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              ></div>
              <span className="ms-5">Loading...</span>
            </>
          ) : data.length > 0 ? (
            Object.keys(groupingData).map((item) => {
              return (
                <div key={item} className="d-flex justify-content-between w-60">
                  <div>
                    <span className="fs-4 fw-normal ">
                      {item}
                    </span>
                  </div>
                  <div>
                    <span className="fs-4 fw-normal ">
                      {groupingData[item].length}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>No records..</h2>
          )}
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              <h4>TotalGross </h4>
            </div>
            <div>
              <h4>RS {totalGross}.00</h4>
            </div>
          </div>
          <button className="btn btn-danger mt-5" onClick={handleData}>
            Clear Today's Revenue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
