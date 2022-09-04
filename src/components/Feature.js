import React from "react";
import "./Feature.css";

const Features = () => {
  const card = (heading, msg) => {
    return (
      <>
        <h3 className="heading-tertiary u-margin-bottom-small">{heading}</h3>
        <p className="feature-box__text">{msg}</p>
      </>
    );
  };
  return (
    <section className="section-features">
      <div className="row">
        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-world"></i>
            {card(
              "Explore the world",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur."
            )}
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-compass"></i>
            {card(
              "Meet nature",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur."
            )}
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-map"></i>
            {card(
              "Find your way",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur."
            )}
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="feature-box">
            <i className="feature-box__icon icon-basic-heart"></i>
            {card(
              "Live a healthier life",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur."
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
