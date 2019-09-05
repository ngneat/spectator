import { Type } from '@angular/core';

import { getDefaultBaseOptions, BaseSpectatorOptions } from '../base/options';
import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';

interface SpectatorHttpOptionsDeprecated<S = any> extends BaseSpectatorOptions {
  /**
   * @deprecated. Please use service property instead.
   */
  dataService: Type<S>;
}

interface SpectatorHttpOptionsNew<S> extends BaseSpectatorOptions {
  service: Type<S>;
}

export type SpectatorHttpOptions<S> = SpectatorHttpOptionsDeprecated<S> | SpectatorHttpOptionsNew<S>;

export function isDeprecated(options: SpectatorHttpOptions<unknown>): options is SpectatorHttpOptionsDeprecated {
  return (options as any).dataService !== undefined;
}

const defaultHttpOptions: OptionalsRequired<SpectatorHttpOptions<any>> = {
  ...getDefaultBaseOptions()
};

/**
 * @internal
 */
export function getDefaultHttpOptions<S>(overrides: SpectatorHttpOptions<S>): Required<SpectatorHttpOptions<S>> {
  return merge(defaultHttpOptions, overrides);
}
