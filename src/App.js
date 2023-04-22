import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Revenue from "./Components/Revenue";
import Billing from "./Components/Billing";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Billing />} />
        <Route path="/Revenue" element={<Revenue />} />
      </Routes>
    </>
  );
}

export default App;
