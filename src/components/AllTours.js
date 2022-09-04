import React, { useEffect, useState } from "react";
import api from "./api/api";
import "./AllTour.css";
import icons from "../img/icons.svg";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Error from "./Error";

const AllTours = () => {
  const [tours, setTours] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/api/v1/tours");
        if (response.data.status === "success") {
          setTours(response.data.data.data);
        }
      } catch (err) {
        setErrorMsg(err.response.data.message);
      }
    };
    fetch();
  }, []);

  const navigate = useNavigate();

  const handleTourDetails = (tourId) => {
    navigate(`/tours/${tourId}`);
  };

  return tours ? (
    <div className="section__allTours">
      <div className="card-container">
        {tours &&
          tours.map((tour) => (
            <div className="card-all" key={tour._id}>
              <div className="card__header-all">
                <div className="card__picture-all">
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
                <h4 className="card__heading-all">
                  <span
                    className="card__heading-span-all"
                    style={{
                      backgroundImage: `linear-gradient( to right bottom ,${tour.primaryColor}, ${tour.secondaryColor})`,
                    }}
                  >
                    {tour.name}
                  </span>
                </h4>
                <div className="card__details-all">
                  <h4 className="card__sub-heading-all">{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
                  <p className="card__text-all">{tour.summary}</p>
                  <div className="card__data-all">
                    <svg className="card__icon-all">
                      <use xlinkHref={`${icons}#${"icon-map-pin"}`}></use>
                    </svg>
                    <span>{tour.startLocation.description}</span>
                  </div>
                  <div className="card__data-all">
                    <svg className="card__icon-all">
                      <use xlinkHref={`${icons}#${"icon-calendar"}`}></use>
                    </svg>
                    <span>
                      {moment(tour.startDates[0]).format("MMMM YYYY")}
                    </span>
                  </div>
                  <div className="card__data-all">
                    <svg className="card__icon-all">
                      <use xlinkHref={`${icons}#${"icon-flag"}`}></use>
                    </svg>
                    <span>{`${tour.locations.length} stops`}</span>
                  </div>
                  <div className="card__data-all">
                    <svg className="card__icon-all">
                      <use xlinkHref={`${icons}#${"icon-user"}`}></use>
                    </svg>
                    <span>{`${tour.maxGroupSize} people`}</span>
                  </div>
                </div>
                <div className="card__footer-all">
                  <p>
                    <span className="card__footer-value-all">
                      {`$${tour.price}`}{" "}
                    </span>
                    <span className="card__footer-text-all">per person</span>
                  </p>
                  <p className="card__ratings-all">
                    <span className="card__footer-value-all">
                      {tour.ratingsAverage}{" "}
                    </span>
                    <span className="card__footer-text-all">{`rating (${tour.ratingsQuantity})`}</span>
                  </p>
                  <button
                    className="btn btn--green btn-tour btn--small"
                    onClick={() => handleTourDetails(tour._id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <Error msg={errorMsg} />
  );
};

export default AllTours;
