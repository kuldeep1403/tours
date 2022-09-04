import React, { useEffect, useState } from "react";
import icons from "../img/icons.svg";
import "./Account.css";
import api from "./api/api";
import { showAlert } from "./Alert";
const Error = React.lazy(() => import("./Error.js"));

const Account = () => {
  const navItem = (link, text, icon, active) => {
    return (
      <li className={`${active ? "side-nav--active" : ""}`}>
        <a href={`${link}`}>
          <svg>
            <use xlinkHref={`${icons}#${`icon-${icon}`}`}></use>
          </svg>
          <p>{text}</p>
        </a>
      </li>
    );
  };

  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [updatePhoto, setUpdatePhoto] = useState({});
  const [role, setRole] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);

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
          const obj = res.data.data.data;
          setName(obj.name);
          setEmail(obj.email);
          setPhoto(obj.photo);
          setRole(obj.role);
          setLogin(true);
        }
      } catch (err) {
        setLogin(false);
      }
    };
    fetchDetails();
  }, [login]);

  const handleUpdateMe = async (e) => {
    e.preventDefault();
    setBtn1(true);
    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("photo", updatePhoto);
      const res = await api.patch("/api/v1/users/updateMe", form, config);
      if (res.data.status === "success") {
        showAlert("success", "Profile updated successfully!");
        window.location.reload();
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
    setBtn1(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setBtn2(true);

    try {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await api.patch(
        "/api/v1/users/updateMyPassword",
        {
          passwordCurrent: currentPassword,
          password,
          passwordConfirm,
        },
        config
      );
      if (res.data.status === "success") {
        showAlert("success", "Password updated successfully!");
        const token = res.data.token;
        localStorage.setItem("token", token);
        setBtn1(false);
        window.location.reload();
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
    setBtn1(false);
  };

  return login ? (
    <section className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            {navItem("#", "Settings", "settings", true)}
            {navItem("/my-tours", "My bookings", "briefcase")}
            {navItem("#", "My reviews", "star")}
            {navItem("#", "Billing", "credit-card")}
            {role === "admin" ? (
              <div className="admin-nav">
                <h5 className="admin-nav__heading">Admin</h5>
                <ul className="side-nav">
                  {navItem("#", "Manage tours", "map")}
                  {navItem("#", "Manage users", "users")}
                  {navItem("#", "Manage reviews", "star")}
                  {navItem("#", "Manage bookings", "briefcase")}
                </ul>
              </div>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary u-margin-bottom-medium">
              Your account settings
            </h2>
            <form
              className="form form-user-data"
              encType="multipart/form-data"
              onSubmit={handleUpdateMe}
            >
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form__input"
                  type="text"
                  required
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form__group u-margin-bottom-medium">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  className="form__input"
                  type="email"
                  required
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form__group form__photo-upload">
                <img className="form__user-photo" src={photo} alt="User" />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  onChange={(e) => setUpdatePhoto(e.target.files[0])}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>
              <div className="form__group right">
                <button className="btn btn--green btn--small">
                  {!btn1 ? "Save settings" : "Updating..."}
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary u-margin-bottom-medium">
              Password change
            </h2>
            <form
              className="form form-user-password"
              onSubmit={handlePasswordChange}
            >
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  type="password"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  id="password-current"
                  name="password-current"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  type="password"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form__group u-margin-bottom-medium">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form__input"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  id="password-confirm"
                  name="password-confirm"
                  value={passwordConfirm}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form__group right">
                <button className="btn btn--green btn--small">
                  {!btn2 ? "Save password" : "Updating..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <Error/>
  );
};

export default Account;
