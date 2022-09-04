import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoibmlja3NpbmdoIiwiYSI6ImNsNjd0dmo3NTA2ZzczZHBtbDc1cXRqM24ifQ.FfnGGvsAvHnFv_e_Xp9xdw";

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement("div");
    el.className = "marker";

    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
