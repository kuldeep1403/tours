import React, { useEffect, useState } from "react";
import "./MainNavigation.css";
import api from "./api/api";
import { useNavigate } from "react-router-dom";
const MainNavigation = () => {
  const [login, setLogin] = useState(false);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchDetails = async () => {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const res = await api.get("/api/v1/users/me", config);
        if (res.data.status === "success") {
          setLogin(true);
        }
      } catch (err) {
        setLogin(false);
      }
    };
    fetchDetails();
  }, [login]);

  
  return (
    <div className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />
      <label className="navigation__button" htmlFor="navi-toggle">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <a href="/" className="navigation__link">
              <span>01</span>Home
            </a>
          </li>
          <li className="navigation__item">
            <a href="/about" className="navigation__link">
              <span>02</span>About Natous
            </a>
          </li>
          <li className="navigation__item">
            <a href="/populartours" className="navigation__link">
              <span>03</span>Popular tours
            </a>
          </li>
          {login ? (
            <li className="navigation__item">
              <a href="/me" className="navigation__link">
                <span>04</span>Profile
              </a>
            </li>
          ) : (
            ""
          )}
          {login ? (
            <li className="navigation__item">
              <div
                className="navigation__div"
                onClick={() => {
                  setLogin(false);
                  localStorage.removeItem("token");
                  navigate("/")
                }}
              >
                <span>05</span>Log out
              </div>
            </li>
          ) : (
            <li className="navigation__item">
              <a href="/login" className="navigation__link">
                <span>04</span>Log in
              </a>
            </li>
          )}
          {!login ? (
            <li className="navigation__item">
              <a href="/register" className="navigation__link">
                <span>05</span>Sign up
              </a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
