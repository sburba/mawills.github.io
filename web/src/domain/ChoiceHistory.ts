import { daysAgoNoon } from "../support/DateUtil";

const STORAGE_KEY = "choice_history";

export default class ChoiceHistory {
  constructor(
    private readonly storage: Storage,
    private readonly maxHistoryDays: number
  ) {}

  get(): Iterable<string> {
    return this._get().values();
  }

  record(day: Date, choice: string) {
    // Force date to noon, so that choosing on a day is always the same
    day.setHours(12, 0, 0, 0);
    const history = this._get();
    history.set(day.toISOString(), choice);
    this.save(history);
  }

  private save(history: Map<string, string>) {
    this.storage.setItem(STORAGE_KEY, JSON.stringify([...history]));
  }

  private _get(): Map<string, string> {
    return new Map(this.getDateChoicePairs());
  }

  private getDateChoicePairs(): Array<[string, string]> {
    const storedValue = this.storage.getItem(STORAGE_KEY) || "[]";

    let pairs: Array<[string, string]>;
    try {
      pairs = JSON.parse(storedValue);
    } catch (e) {
      pairs = [];
    }

    const oldestAllowedDate = daysAgoNoon(this.maxHistoryDays);
    return pairs.filter(([dateStr]) => {
      return new Date(dateStr).getTime() > oldestAllowedDate.getTime();
    });
  }
}
