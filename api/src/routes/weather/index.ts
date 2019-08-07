import { NowRequest, NowResponse } from "@now/node/dist";
import WeatherFetcher from "../../WeatherFetcher";
import fetch from "node-fetch";

export default async (_: NowRequest, res: NowResponse) => {
  if (!process.env.OPEN_WEATHER_API_KEY) {
    console.error("environment variable OPEN_WEATHER_API_KEY is not set");
    res.status(500).json({
      error: "server_error",
      message: "Unexpected server error"
    });
    return;
  }

  const fetcher = new WeatherFetcher(fetch, process.env.OPEN_WEATHER_API_KEY);
  const weather = await fetcher.get("48104");
  res.status(200).json(weather);
};
