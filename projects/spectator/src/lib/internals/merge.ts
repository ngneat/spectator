import { OptionalsRequired } from '../types';

/**
 * @internal
 */
export function merge<T>(defaults: OptionalsRequired<T>, overrides: T): Required<T> {
  return Object.assign({}, defaults, overrides) as Required<T>;
}
