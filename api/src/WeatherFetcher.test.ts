import FetchMock, { FetchMockSandbox } from "fetch-mock";
import WeatherFetcher, { WeatherConditions } from "./WeatherFetcher";

let fetch: FetchMockSandbox;
let weatherFetcher: WeatherFetcher;

beforeEach(() => {
  fetch = FetchMock.sandbox();
  weatherFetcher = new WeatherFetcher(fetch, "INVALID_API_KEY");
});

it.each`
  weatherCodes       | isRaining
  ${[100]}           | ${false}
  ${[100, 101, 150]} | ${false}
  ${[100, 200, 150]} | ${true}
  ${[200]}           | ${true}
  ${[700]}           | ${false}
`(
  "isRaining should be $isRaining when given weather codes: $weatherCodes",
  async ({ weatherCodes, isRaining }) => {
    fetch.mock({
      matcher: /weather/,
      query: { zip: "12345", units: "imperial" },
      response: {
        main: { temp: 72 },
        weather: weatherCodes.map((code: number) => ({ id: code }))
      }
    });

    expect(await weatherFetcher.get("12345")).toEqual(
      new WeatherConditions(72, isRaining)
    );
  }
);
