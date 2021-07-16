import { OptionalsRequired } from '../types';

/**
 * @internal
 */
export function merge<T>(defaults: OptionalsRequired<T>, overrides?: T): Required<T> {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return { ...defaults, ...overrides } as Required<T>;
}
