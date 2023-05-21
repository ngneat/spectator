import { OptionalsRequired } from '../types';

/**
 * @internal
 */
export function merge<T>(defaults: OptionalsRequired<T>, overrides?: T): Required<T> {
  return { ...defaults, ...overrides } as Required<T>;
}
