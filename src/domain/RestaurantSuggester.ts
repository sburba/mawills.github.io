import ChoiceHistory from "./ChoiceHistory";

export default class RestaurantSuggester {
  constructor(
    private readonly options: string[],
    private readonly history: ChoiceHistory
  ) {}

  public suggest(count: number): string[] {
    const excludes = Array.from(this.history.get());
    const suggestions: string[] = [];
    const options = this.options.filter(option => !excludes.includes(option));
    for (let i = 0; i < count; i++) {
      const choiceIndex = Math.floor(Math.random() * options.length);
      suggestions.push(options[choiceIndex]);
      options.splice(choiceIndex, 1);
    }

    return suggestions;
  }

  public choose(restaurant: string) {
    this.history.record(new Date(), restaurant);
  }
}
