export function withTimeout<T>(
  action: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeout = new Promise<T>((resolve, reject) =>
    setTimeout(() => reject("Operation timed out"), timeoutMs)
  );
  return Promise.race([action, timeout]);
}
