import { Type } from '@angular/core';

import { getDefaultBaseOptions, BaseSpectatorOptions } from '../base/options';
import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';

export interface SpectatorHttpOptions<S = any> extends BaseSpectatorOptions {
  dataService: Type<S>;
}

const defaultHttpOptions: OptionalsRequired<SpectatorHttpOptions> = {
  ...getDefaultBaseOptions()
};

/**
 * @internal
 */
export function getDefaultHttpOptions<S>(overrides: SpectatorHttpOptions<S>): Required<SpectatorHttpOptions<S>> {
  return merge(defaultHttpOptions, overrides) as Required<SpectatorHttpOptions<S>>;
}
