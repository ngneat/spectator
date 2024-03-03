import { Type } from '@angular/core';

import { getDefaultBaseOptions, BaseSpectatorOptions } from '../base/options';
import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';

export interface SpectatorServiceOptions<S = any> extends BaseSpectatorOptions {
  service: Type<S>;
}

const defaultServiceOptions: OptionalsRequired<SpectatorServiceOptions> = {
  ...getDefaultBaseOptions(),
};

/**
 * @internal
 */
export function getDefaultServiceOptions<S>(overrides: SpectatorServiceOptions<S>): Required<SpectatorServiceOptions<S>> {
  return merge(defaultServiceOptions, overrides) as Required<SpectatorServiceOptions<S>>;
}
