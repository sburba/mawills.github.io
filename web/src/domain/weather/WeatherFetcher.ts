import * as t from "io-ts";

export const WeatherConditionsValidator = t.type({
  temp_fahrenheit: t.number,
  is_raining: t.boolean
}, "WeatherConditions");

export type WeatherConditions = t.TypeOf<typeof WeatherConditionsValidator>

export default interface WeatherFetcher {
  get(): Promise<WeatherConditions>
}