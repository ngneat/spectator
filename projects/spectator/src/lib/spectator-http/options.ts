import { Type } from '@angular/core';

import { getDefaultBaseOptions, BaseSpectatorOptions } from '../base/options';
import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';

export interface SpectatorHttpOptions<S> extends BaseSpectatorOptions {
  service: Type<S>;
}

const defaultHttpOptions: OptionalsRequired<SpectatorHttpOptions<any>> = {
  ...getDefaultBaseOptions(),
};

/**
 * @internal
 */
export function getDefaultHttpOptions<S>(overrides: SpectatorHttpOptions<S>): Required<SpectatorHttpOptions<S>> {
  return merge(defaultHttpOptions, overrides);
}
