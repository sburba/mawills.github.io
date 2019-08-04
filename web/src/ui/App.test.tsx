import React from "react";
import App from "./App";
import RestaurantSuggester from "../domain/RestaurantSuggester";
import ChoiceHistory from "../domain/ChoiceHistory";
import MapStorage from "../__test_support__/MapStorage";
import { cleanup, render, fireEvent, act } from "@testing-library/react";
import "jest-dom/extend-expect";
import MemoryWeatherFetcher from "../__test_support__/MemoryWeatherFetcher";

let storage: Storage;
let suggester: RestaurantSuggester;

beforeEach(() => {
  storage = new MapStorage();
  suggester = new RestaurantSuggester(
    new Map([
      ["one", { outdoorSeating: true }],
      ["two", { outdoorSeating: true }],
      ["three", { outdoorSeating: true }]
    ]),
    new ChoiceHistory(storage, 3),
    new MemoryWeatherFetcher({
      temp_fahrenheit: 72,
      is_raining: false
    })
  );
});

afterEach(cleanup);

it("Shows toast when choice is selected", async () => {
  const { findByText } = render(<App suggester={suggester} />);
  const secondChoiceButton = await findByText(/two/);
  //TODO: This warns because it doesn't render until WeatherFetcher.get returns,
  // we can't do async act until this is released:
  // https://github.com/facebook/react/issues/14769#issuecomment-479942713
  act(() => {
    fireEvent.click(secondChoiceButton);
  });
  expect(await findByText("two it is")).toBeVisible();
});
