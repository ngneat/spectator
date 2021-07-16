export function isRunningInJsDom() {
  return navigator.userAgent.includes('Node.js') || navigator.userAgent.includes('jsdom');
}

export function coerceArray<T>(value: T | T[]): T[];
export function coerceArray<T>(value: T | readonly T[]): readonly T[];
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
