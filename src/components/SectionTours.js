import React, { useEffect, useState } from "react";
import icons from "../img/icons.svg";
import api from "./api/api";
import moment from "moment";
import "./SectionTours.css";
import { showAlert } from "./Alert";
import { Link } from "react-router-dom";

const SectionTours = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/api/v1/tours/top-3-tours");
        if (response.data.status === "success") {
          setTours(response.data.data.data);
        }
      } catch (err) {
        showAlert("error", err.response.data.messag);
      }
    };
    fetch();
  }, []);

  return (
    <section className="section-tour">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">Most popular tours</h2>
      </div>
      <div className="row">
        {tours &&
          tours.map((tour) => (
            <div className="col-1-of-3" key={tour._id}>
              <div className="card-tour">
                <div className="card__side-tour card__side--front-tour">
                  <div className="card__picture-tour">
                    <div
                      className="card__picture-overlay"
                      style={{
                        backgroundImage: `linear-gradient( to right bottom ,${tour.primaryColor}, ${tour.secondaryColor})`,
                      }}
                    >
                      &nbsp;
                    </div>
                    <img
                      src={require(`../img/tours/${tour.imageCover}`)}
                      alt={`${tour.name}`}
                      className="card__picture-img"
                    />
                  </div>
                  <h4 className="card__heading-tour">
                    <span
                      className="card__heading-span-tour"
                      style={{
                        backgroundImage: `linear-gradient( to right bottom ,${tour.primaryColor}, ${tour.secondaryColor})`,
                      }}
                    >
                      {tour.name}
                    </span>
                  </h4>
                  <div className="card__details-tour">
                    <h4 className="card__sub-heading-tour">{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
                    <p className="card__text-tour">{tour.summary}</p>
                    <div className="card__data-tour">
                      <svg className="card__icon-tour">
                        <use xlinkHref={`${icons}#${"icon-map-pin"}`}></use>
                      </svg>
                      <span>{tour.startLocation.description}</span>
                    </div>
                    <div className="card__data-tour">
                      <svg className="card__icon-tour">
                        <use xlinkHref={`${icons}#${"icon-calendar"}`}></use>
                      </svg>
                      <span>
                        {moment(tour.startDates[0]).format("MMMM YYYY")}
                      </span>
                    </div>
                    <div className="card__data-tour">
                      <svg className="card__icon-tour">
                        <use xlinkHref={`${icons}#${"icon-flag"}`}></use>
                      </svg>
                      <span>{`${tour.locations.length} stops`}</span>
                    </div>
                    <div className="card__data-tour">
                      <svg className="card__icon-tour">
                        <use xlinkHref={`${icons}#${"icon-user"}`}></use>
                      </svg>
                      <span>{`${tour.maxGroupSize} people`}</span>
                    </div>
                  </div>
                  <div className="card__footer-tour">
                    <p>
                      <span className="card__footer-value-tour">
                        {`$${tour.price}`}{" "}
                      </span>
                      <span className="card__footer-text-tour">per person</span>
                    </p>
                    <p className="card__ratings-tour">
                      <span className="card__footer-value-tour">
                        {tour.ratingsAverage}{" "}
                      </span>
                      <span className="card__footer-text-tour">{`rating (${tour.ratingsQuantity})`}</span>
                    </p>
                  </div>
                </div>
                <div
                  className="card__side-tour card__side--back-tour"
                  style={{
                    backgroundImage: `linear-gradient( to right bottom ,${tour.primaryColor}, ${tour.secondaryColor})`,
                  }}
                >
                  <div className="card__cta-tour">
                    <div className="card__price-box-tour">
                      <p className="card__price-only-tour">only</p>
                      <p className="card__price-value-tour">{`$${tour.price}`}</p>
                    </div>
                    <a href="#popup" className="btn btn--white">
                      Book now!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="u-center-text u-margin-top-huge">
        <Link to="/tours" className="btn btn--green">
          Discover all tours
        </Link>
      </div>
    </section>
  );
};

export default SectionTours;
