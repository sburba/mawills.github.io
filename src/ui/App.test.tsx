import React from "react";
import App from "./App";
import RestaurantSuggester from "../domain/RestaurantSuggester";
import ChoiceHistory from "../domain/ChoiceHistory";
import MapStorage from "../__test_support__/MapStorage";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";

let storage: Storage;
let suggester: RestaurantSuggester;

beforeEach(() => {
  storage = new MapStorage();
  suggester = new RestaurantSuggester(
    ["one", "two", "three"],
    new ChoiceHistory(storage, 3)
  );
});

afterEach(cleanup);

it("Shows toast when choice is selected", () => {
  const { getByText } = render(<App suggester={suggester} />);
  fireEvent.click(getByText(/two/));
  expect(getByText("two it is")).toBeVisible();
});
