import ChoiceHistory from "./ChoiceHistory";
import MapStorage from "../__test_support__/MapStorage";
import RestaurantSuggester from "./RestaurantSuggester";
import { mockRandom, resetMockRandom } from "../__test_support__/MockRandom";
import MemoryNetworkFetcher from "../__test_support__/MemoryWeatherFetcher";

let history: ChoiceHistory;
beforeEach(() => {
  history = new ChoiceHistory(new MapStorage(), 3);
});

afterEach(() => {
  resetMockRandom();
});

test("Suggests from choices", async () => {
  mockRandom([0 / 3, 0 / 3, 0 / 3]);

  const suggester = new RestaurantSuggester(
    new Map([
      ["one", { outdoorSeating: true }],
      ["two", { outdoorSeating: true }],
      ["three", { outdoorSeating: true }],
      ["four", { outdoorSeating: true }]
    ]),
    history,
    new MemoryNetworkFetcher({
      temp_fahrenheit: 72,
      is_raining: true
    })
  );
  const suggestions = await suggester.suggest(3);
  expect(suggestions).toEqual(["one", "two", "three"]);
});

test("Doesn't suggest recent choices", async () => {
  mockRandom([0 / 4, 1 / 4, 2 / 4]);

  const suggester = new RestaurantSuggester(
    new Map([
      ["one", { outdoorSeating: true }],
      ["two", { outdoorSeating: true }],
      ["three", { outdoorSeating: true }],
      ["four", { outdoorSeating: true }]
    ]),
    history,
    new MemoryNetworkFetcher({ temp_fahrenheit: 72, is_raining: false })
  );
  suggester.choose("one");
  const suggestions = await suggester.suggest(3);
  expect(suggestions).toEqual(["two", "three", "four"]);
});

test("Doesn't suggest the same choice more than once", async () => {
  mockRandom([0, 0, 0]);

  const suggester = new RestaurantSuggester(
    new Map([
      ["one", { outdoorSeating: true }],
      ["two", { outdoorSeating: true }],
      ["three", { outdoorSeating: true }],
      ["four", { outdoorSeating: true }]
    ]),
    history,
    new MemoryNetworkFetcher({ temp_fahrenheit: 72, is_raining: false })
  );
  const suggestions = await suggester.suggest(3);
  expect(suggestions).toEqual(["one", "two", "three"]);
});

test("Only suggests places with outdoor seating when it's nice out", async () => {
  mockRandom([0, 0, 0]);

  const suggester = new RestaurantSuggester(
    new Map([
      ["one", { outdoorSeating: false }],
      ["two", { outdoorSeating: true }],
      ["three", { outdoorSeating: true }],
      ["four", { outdoorSeating: true }]
    ]),
    history,
    new MemoryNetworkFetcher({ temp_fahrenheit: 72, is_raining: false })
  );

  const suggestions = await suggester.suggest(3);
  expect(suggestions).toEqual(["two", "three", "four"]);
});
