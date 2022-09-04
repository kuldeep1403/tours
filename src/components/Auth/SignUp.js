import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../Alert";
import api from "../api/api";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setMsg(true);
    try {
      const res = await api.post("/api/v1/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });

      if (res.data.status === "success") {
        showAlert("success", "Account created successfully!");
        const token = res.data.token;
        localStorage.setItem("token", token);
        setMsg(false);
        navigate("/");
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMsg(false);
  };

  return (
    <main className="main_signup">
      <div className="signup-form">
        <h2 className="heading__signup u-margin-bottom-medium">
          Create an account
        </h2>
        <form className="from from--signup" onSubmit={handleSignUp}>
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
              placeholder="Enter a profile name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              Password
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
              Password confirm
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
          <div className="form__group">
            <button className="btn btn--green btn--small">
              {!msg ? "Sign Up" : "Processing..."}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
