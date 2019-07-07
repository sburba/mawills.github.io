import ChoiceHistory from "./ChoiceHistory";
import MapStorage from "../__test_support__/MapStorage";
import RestaurantSuggester from "./RestaurantSuggester";
import { mockRandom, resetMockRandom } from "../__test_support__/MockRandom";

let history: ChoiceHistory;
beforeEach(() => {
  history = new ChoiceHistory(new MapStorage(), 3);
});

afterEach(() => {
  resetMockRandom();
});

test("Suggests from choices", () => {
  mockRandom([0 / 3, 1 / 3, 2 / 3]);

  const suggester = new RestaurantSuggester(["one", "two", "three"], history);
  const suggestions = suggester.suggest(3);
  expect(suggestions).toEqual(["one", "two", "three"]);
});

test("Doesn't suggest recent choices", () => {
  mockRandom([0 / 4, 1 / 4, 2 / 4]);

  const suggester = new RestaurantSuggester(
    ["one", "two", "three", "four"],
    history
  );
  suggester.choose("one");
  const suggestions = suggester.suggest(3);
  expect(suggestions).toEqual(["two", "three", "four"]);
});

test("Doesn't suggest the same choice more than once", () => {
  mockRandom([0, 0, 0]);

  const suggester = new RestaurantSuggester(
    ["one", "two", "three", "four"],
    history
  );
  const suggestions = suggester.suggest(3);
  expect(suggestions).toEqual(["one", "two", "three"]);
});
