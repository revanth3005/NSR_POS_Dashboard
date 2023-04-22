import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg " style={{backgroundColor:'teal', color:'white'}}>
      <div className="container-fluid">
        <span className="navbar-brand text-white fw-semibold fs-3">
          Navbar
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"></li>
            <li className="nav-item">
              <NavLink className="nav-link" end to={"/"}>
                Billing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/Revenue"}>
                Revenue
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
