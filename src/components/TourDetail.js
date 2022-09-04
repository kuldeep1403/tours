import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icons from "../img/icons.svg";
import api from "./api/api";
import Error from "./Error";
import { displayMap } from "./mapBox";
import "./TourDetail.css";

const TourDetail = () => {
  const [tour, setTour] = useState(null);
  const { Id } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  const card = (label, text, icon) => {
    return (
      <div className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlinkHref={`${icons}#${`icon-${icon}`}`}></use>
        </svg>
        <span className="overview-box__label">{label} </span>
        <span className="overview-box__text">{text}</span>
      </div>
    );
  };

  const reviewCard = (review) => {
    const arrayStar = [1, 2, 3, 4, 5];
    return (
      <div className="reviews__card">
        <div className="reviews__avatar">
          <img
            src={require(`../img/users/${review.user.photo}`)}
            alt={`${review.user.name}`}
            className="reviews__avatar-img"
          />
          <h6 className="reviews__user">{review.user.name}</h6>
        </div>
        <p className="reviews__text">{review.review}</p>
        <div className="reviews__rating">
          {arrayStar.map((star) => (
            <svg
              className={`reviews__star reviews__star--${
                review.rating >= star ? "active" : "inactive"
              }`}
            >
              <use xlinkHref={`${icons}#${"icon-star"}`}></use>
            </svg>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/v1/tours/${Id}`);
        if (res.data.status === "success") {
          setTour(res.data.data.data);
        }
      } catch (err) {
        setErrorMsg(err.response.data.message);
      }
    };
    fetchData();
  }, [Id]);

  if (tour && document.getElementById("map")) {
    displayMap(tour.locations);
  }

  return tour ? (
    <div>
      <>
        <section className="section-tourDetail">
          <div className="tourDetail__img-box">
            <div
              className="card__picture-overlay"
              style={{
                backgroundImage: `linear-gradient( to right bottom ,${tour.primaryColor}, ${tour.secondaryColor})`,
              }}
            >
              &nbsp;
            </div>
            <img
              className="card__picture-img"
              style={{ objectPosition: "50% 25%" }}
              src={require(`../img/tours/${tour.imageCover}`)}
              alt={`${tour.name}`}
            ></img>
          </div>
          <div className="tourDeatils__text-box">
            <div className="tourDetails-main__box">
              <span
                style={{
                  backgroundImage: `linear-gradient( to right bottom ,${tour.primaryColor}, ${tour.secondaryColor})`,
                }}
              >
                {tour.name}
              </span>
            </div>
            <div className="tourDetails-box__group">
              <div className="tourDetails-box__detail">
                <svg className="tourDetails-box__icon">
                  <use xlinkHref={`${icons}#${"icon-clock"}`}></use>
                </svg>
                <span className="tourDetails-box__text">{tour.duration}</span>
              </div>
              <div className="tourDetails-box__detail">
                <svg className="tourDetails-box__icon">
                  <use xlinkHref={`${icons}#${"icon-map-pin"}`}></use>
                </svg>
                <span className="tourDetails-box__text">
                  {tour.startLocation.description}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="section-description">
          <div className="overview-box">
            <div>
              <div className="overview-box__group">
                <h2 className="heading-secondary u-margin-bottom-medium">
                  Quick facts
                </h2>
                {card(
                  "Next date",
                  moment(tour.startDates[0]).format("MMMM YYYY"),
                  "calendar"
                )}
                {card("Difficulty", tour.difficulty, "trending-up")}
                {card("Participants", `${tour.maxGroupSize} people`, "user")}
                {card("Rating", `${tour.ratingsAverage} / 5`, "star")}
              </div>
              <div className="overview-box__group">
                <h2 className="heading-secondary u-margin-bottom-medium">
                  Your tour guides
                </h2>
                {tour.guides.map((guide, i) => (
                  <div className="overview-box__detail" key={i}>
                    <img
                      src={require(`../img/users/${guide.photo}`)}
                      alt={guide.name}
                      className="overview-box__img"
                    />
                    {guide.role === "lead-guide" ? (
                      <span className="overview-box__label">Lead guide</span>
                    ) : (
                      <span className="overview-box__label">Tour guide</span>
                    )}

                    <span className="overview-box__text">{guide.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="description-box">
            <h2 className="heading-secondary u-margin-bottom-medium">
              {`About ${tour.name} tour`}
            </h2>
            {tour.description.split("\n").map((el, i) => (
              <p className="description__text" key={i}>
                {el}
              </p>
            ))}
          </div>
        </section>
        <section className="section-pictures">
          {tour.images.map((image, i) => (
            <div className="picture-box" key={i}>
              <img
                className={`picture-box__img picture-box__img--${i + 1}`}
                src={require(`../img/tours/${image}`)}
                alt={`The Park Camper Tour ${i + 1}`}
              />
            </div>
          ))}
        </section>
        <section className="section-map">
          <div id="map"></div>
        </section>
        <section className="section-reviews">
          <div className="reviews">
            {tour.reviews.map((review) => reviewCard(review))}
          </div>
        </section>
        <section className="section-cta">
          <div className="cta">
            <div className="cta__img cta__img--logo">
              <img src={require("../img/logo-white.png")} alt="Natours logo" />
            </div>
            <img
              src={require(`../img/tours/${tour.images[1]}`)}
              alt="tour pic 1"
              className="cta__img cta__img--1"
            />
            <img
              src={require(`../img/tours/${tour.images[2]}`)}
              alt="tour pic 1"
              className="cta__img cta__img--2"
            />
            <div className="cta__content">
              <h2 className="heading-secondary">What are you waiting for?</h2>
              <p className="cta__text">
                {`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
              </p>
              <button className="btn btn--green span-all-rows">
                Book tour now!
              </button>
            </div>
          </div>
        </section>
      </>
    </div>
  ) : (
    <Error msg={errorMsg} />
  );
};

export default TourDetail;
