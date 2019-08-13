import { OptionalsRequired } from '../types';

/**
 * @internal
 */
export function merge<T>(defaults: OptionalsRequired<T>, overrides: T): Required<T> {
  // tslint:disable-next-line:no-object-literal-type-assertion
  return { ...defaults, ...overrides } as Required<T>;
}
