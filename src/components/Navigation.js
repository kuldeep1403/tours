import React from "react";
import "./Navigation.css"
import img from "../img/logo-white.png";

const Navigation = () => {
  return (
    <header className="header">
      <nav className="nav nav--tours"></nav>
      <div className="header__logo">
        <img src={img} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        
      </nav>
    </header>
  );
};

export default Navigation;
