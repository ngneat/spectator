import { Type } from '@angular/core';

import { getDefaultBaseOptions, BaseSpectatorOptions } from '../base/options';
import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';

/**
 * @publicApi
 */
export interface SpectatorOptions<C = any> extends BaseSpectatorOptions {
  component: Type<C>;
  shallow?: boolean;
  componentProviders?: any[];
  detectChanges?: boolean;
  declareComponent?: boolean;
  componentMocks?: Type<any>[];
}

const defaultSpectatorOptions: OptionalsRequired<SpectatorOptions> = {
  ...getDefaultBaseOptions(),
  shallow: false,
  declareComponent: true,
  detectChanges: true,
  componentProviders: [],
  componentMocks: []
};

/**
 * @internal
 */
export function getSpectatorDefaultOptions<C>(overrides?: SpectatorOptions<C>): Required<SpectatorOptions<C>> {
  return merge(defaultSpectatorOptions, overrides) as Required<SpectatorOptions<C>>;
}
