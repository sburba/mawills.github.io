import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./ui/App";
import * as serviceWorker from "./serviceWorker";
import RestaurantSuggester from "./domain/RestaurantSuggester";
import ChoiceHistory from "./domain/ChoiceHistory";
import RestaurantDetails from "./domain/RestaurantDetails";
import NetworkWeatherFetcher from "./domain/weather/NetworkWeatherFetcher";

const MAX_HISTORY_DAYS = 5;
const OPTIONS = new Map<string, RestaurantDetails>([
  ["Chipotle", { outdoorSeating: true }],
  ["Piada", { outdoorSeating: true }],
  ["Tios", { outdoorSeating: true }],
  ["Jamaican Jerk Pit", { outdoorSeating: true }],
  ["Tomokun Noodle Bar", { outdoorSeating: false }],
  ["Knights", { outdoorSeating: true }],
  ["Pretzel Bell", { outdoorSeating: true }],
  ["Neo's", { outdoorSeating: false }],
  ["Taste of India", { outdoorSeating: false }],
  ["La Taqueria", { outdoorSeating: false }],
  ["Mama Soto", { outdoorSeating: false }],
  ["Earthen Jar", { outdoorSeating: false }],
  ["Jolly Pumpkin", { outdoorSeating: false }],
  ["Frita Batido", { outdoorSeating: true }],
  ["Grizzly Peak", { outdoorSeating: true }],
  ["KouZina", { outdoorSeating: false }],
  ["Frank's", { outdoorSeating: false }],
  ["Cottage Inn", { outdoorSeating: true }],
  ["Ashley's", { outdoorSeating: false }],
  ["Chela's", { outdoorSeating: true }],
  ["Fleetwood Diner", { outdoorSeating: true }]
]);

const suggester = new RestaurantSuggester(
  OPTIONS,
  new ChoiceHistory(window.localStorage, MAX_HISTORY_DAYS),
  new NetworkWeatherFetcher()
);

ReactDOM.render(<App suggester={suggester} />, document.getElementById("root"));

serviceWorker.register();
