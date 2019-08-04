import fetch from "node-fetch";
import { URLSearchParams, URL } from "url";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

interface ForecastMain {
  temp: number;
}

interface ForecastWeather {
  id: number;
  main: string;
}

interface OpenWeatherApiResponse {
  main: ForecastMain;
  weather: ForecastWeather[];
}

class WeatherConditions {
  constructor(
    public readonly temp_fahrenheit: number,
    public readonly is_raining: boolean
  ) {}
}

function isRaining(weather: ForecastWeather) {
  // https://openweathermap.org/weather-conditions
  // Inclement weather (rain, snow, etc..) starts at 200 and ends at 700
  return weather.id >= 200 && weather.id < 700;
}

export default class WeatherFetcher {
  constructor(private readonly openWeatherApiKey: string) {}

  async get(zip: string): Promise<WeatherConditions> {
    const params = new URLSearchParams({
      zip: zip,
      units: "imperial",
      APPID: this.openWeatherApiKey
    });
    const url = new URL(WEATHER_URL);
    url.search = params.toString();

    const resp = await fetch(url.toString());
    const body: OpenWeatherApiResponse = await resp.json();
    const temp = body.main.temp;
    const is_raining = body.weather.find(isRaining) !== undefined;

    return new WeatherConditions(temp, is_raining);
  }
}
