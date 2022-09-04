import React from "react";
import "./Error.css";

const Error = ({ msg }) => {
  var errorMsg = msg ? msg : "";
  return (
    <div className="main-error">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Uh oh! Something went wrong!
          </h2>
          <h2 className="error__emoji">😢 🤯</h2>
        </div>
        <div className="error__msg">{errorMsg}</div>
      </div>
    </div>
  );
};

export default Error;
