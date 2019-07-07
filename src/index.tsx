import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./ui/App";
import * as serviceWorker from "./serviceWorker";
import RestaurantSuggester from "./domain/RestaurantSuggester";
import ChoiceHistory from "./domain/ChoiceHistory";

const MAX_HISTORY_DAYS = 3;
const OPTIONS = [
  "Chipotle",
  "Piada",
  "Tios",
  "Jamaican Jerk Pit",
  "Tomokun Noodle Bar",
  "Knights",
  "Pretzel Bell",
  "Neo's",
  "Taste of India",
  "La Taqueria",
  "Mama Soto",
  "Earthen Jar",
  "Jolly Pumpkin",
  "Frita Batido",
  "Grizzly Peak",
  "KouZina Greek Street Food",
  "Frank's",
  "Cottage Inn",
  "Ashley's",
  "Chela's",
  "Fleetwood Diner"
];

const suggester = new RestaurantSuggester(
  OPTIONS,
  new ChoiceHistory(window.localStorage, MAX_HISTORY_DAYS)
);

ReactDOM.render(<App suggester={suggester} />, document.getElementById("root"));

serviceWorker.register();
