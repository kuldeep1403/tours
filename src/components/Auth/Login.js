import React, { useState } from "react";
import { showAlert } from "../Alert";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg(true);
    try {
      const res = await api.post("/api/v1/users/login", {
        email,
        password,
      });
      if (res.data.status === "success") {
        showAlert("success", "Logged in successfully!");
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
    setEmail("");
    setPassword("");
    setMsg(false);
  };

  return (
    <main className="main_login">
      <div className="login-form">
        <h2 className="heading__login u-margin-bottom-medium">
          Log into your account
        </h2>
        <form className="form form--login" onSubmit={handleLogin}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              type="email"
              required
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__group u-margin-bottom-medium">
            <label className="form__label" htmlFor="password-confirm">
              Password
            </label>
            <input
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength="8"
              id="password-confirm"
              name="password-confirm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green btn--small">
              {!msg ? "Login" : "Processing..."}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
