import * as t from "io-ts";

const WeatherConditions = t.type({
  temp_fahrenheit: t.number,
  is_raining: t.boolean
});

export default WeatherConditions
