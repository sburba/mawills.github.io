import WeatherFetcher, { WeatherConditions } from "../domain/weather/WeatherFetcher";

export default class MemoryNetworkFetcher implements WeatherFetcher {
  public constructor(private readonly result: WeatherConditions|Error ) {}
  get(): Promise<WeatherConditions> {
    if (this.result instanceof Error) {
      return Promise.reject(this.result);
    } else {
      return Promise.resolve(this.result);
    }
  }
}