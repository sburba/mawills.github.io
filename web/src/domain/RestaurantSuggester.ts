import ChoiceHistory from "./ChoiceHistory";
import RestaurantDetails from "./RestaurantDetails";
import NetworkWeatherFetcher from "./weather/NetworkWeatherFetcher";
import { WeatherConditions } from "./weather/WeatherFetcher";

export default class RestaurantSuggester {
  constructor(
    private readonly options: Map<string, RestaurantDetails>,
    private readonly history: ChoiceHistory,
    private readonly weather: NetworkWeatherFetcher
  ) {}

  public async suggest(count: number): Promise<string[]> {
    const excludes = Array.from(this.history.get());
    const suggestions: string[] = [];

    const conditions = await this.fetchConditions();

    const isNiceOut =
      (conditions && RestaurantSuggester.isNiceOut(conditions)) || !conditions;

    const options = Array.from(this.options).filter(([name, details]) => {
      let allow = !excludes.includes(name);
      if (isNiceOut) {
        allow = allow && details.outdoorSeating;
      }
      return allow;
    });

    for (let i = 0; i < count; i++) {
      const choiceIndex = Math.floor(Math.random() * options.length);
      const [name] = options[choiceIndex];
      suggestions.push(name);
      options.splice(choiceIndex, 1);
    }

    return suggestions;
  }

  public choose(restaurant: string) {
    this.history.record(new Date(), restaurant);
  }

  private static isNiceOut(conditions: WeatherConditions): boolean {
    return conditions.temp_fahrenheit > 68 && !conditions.is_raining;
  }

  private async fetchConditions(): Promise<WeatherConditions | null> {
    try {
      return await this.weather.get();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
