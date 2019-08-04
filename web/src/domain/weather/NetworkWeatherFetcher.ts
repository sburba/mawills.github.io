import WeatherFetcher, { WeatherConditions, WeatherConditionsValidator } from "./WeatherFetcher";
import { decode } from "../../support/DecodeUtil";
import { withTimeout } from "../../support/AsyncUtil";

const TIMEOUT_MS = 1000;

export default class NetworkWeatherFetcher implements WeatherFetcher {
  async get(): Promise<WeatherConditions> {
    const response = await withTimeout(fetch("/api/weather"), TIMEOUT_MS);
    return decode(WeatherConditionsValidator, await response.json());
  }
}
