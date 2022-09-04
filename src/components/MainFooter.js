import React from "react";
import logo from "../img/logo-green-2x.png";
import "./MainFooter.css"

const MainFooter = () => {
  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <img src={logo} alt="Full logo" className="footer__logo" />
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <div className="footer__navigation">
            <ul className="footer__list">
              <li className="footer__items">
                <a href="/" className="footer__link">
                  Company
                </a>
              </li>
              <li className="footer__items">
                <a href="/" className="footer__link">
                  Contact us
                </a>
              </li>
              <li className="footer__items">
                <a href="/" className="footer__link">
                  Carrers
                </a>
              </li>
              <li className="footer__items">
                <a href="/" className="footer__link">
                  Privacy policy
                </a>
              </li>
              <li className="footer__items">
                <a href="/" className="footer__link">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-1-of-2">
          <p className="footer__copyright">
            Built by{" "}
            <a href="/" className="footer__link">
              Kuldeep Singh
            </a>{" "}
            . Copyright &copy; by Kuldeep Singh. it is not my own design. I give
            big credit to the original author,{" "}
            <a href="/" className="footer__link">
              Jonas Schmedtmann.
            </a>{" "}
            Because he is the one who design this beautiful website
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
