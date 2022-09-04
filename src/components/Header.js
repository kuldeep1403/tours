import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo-white.png";
import "./Header.css"


const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img src={logo} alt="Logo" className="header__logo" />
      </div>
      <div className="header__text-box">
        <h1 className="heading_primary">
          <span className="heading_primary--main">Outdoors</span>
          <span className="heading_primary--sub">is where life happens</span>
        </h1>
        <Link to="/tours" className="btn btn--white btn--animated">
          Discover our tours
        </Link>
      </div>
    </header>
  );
};

export default Header;
