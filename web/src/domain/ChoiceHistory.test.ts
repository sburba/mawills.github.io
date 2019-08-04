import ChoiceHistory from "./ChoiceHistory";
import MapStorage from "../__test_support__/MapStorage";
import * as Time from "jest-date-mock";

const MAX_HISTORY_DAYS = 3;

function day(date: number) {
  const day = new Date("2000-01-01T12:00:00.000Z");
  day.setDate(date);
  return day;
}

let storage: MapStorage;
let history: ChoiceHistory;
beforeEach(() => {
  storage = new MapStorage();
  history = new ChoiceHistory(storage, MAX_HISTORY_DAYS);
});

it("Can record and fetch choices", () => {
  Time.advanceTo(day(1));
  history.record(day(3), "choice");
  expect(Array.from(history.get())).toEqual(["choice"]);
});

it("Removes old entries", () => {
  Time.advanceTo(day(1 + MAX_HISTORY_DAYS));
  history.record(day(1), "choice");
  expect(Array.from(history.get())).toEqual([]);
});

it("Handles corrupted storage", () => {
  storage.setItem("choice_history", "INVALID");
  expect(Array.from(history.get())).toEqual([]);
});
