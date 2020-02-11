import { Type } from '@angular/core';

import { getDefaultBaseOptions, BaseSpectatorOptions } from '../base/options';
import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';

/**
 * @publicApi
 */
export interface SpectatorOptions<C> extends BaseSpectatorOptions {
  component: Type<C>;
  shallow?: boolean;
  componentProviders?: any[];
  componentViewProviders?: any[];
  detectChanges?: boolean;
  declareComponent?: boolean;
  componentMocks?: Type<any>[];
  componentViewMocks?: Type<any>[];
}

const defaultSpectatorOptions: OptionalsRequired<SpectatorOptions<any>> = {
  ...getDefaultBaseOptions(),
  shallow: false,
  declareComponent: true,
  detectChanges: true,
  componentProviders: [],
  componentViewProviders: [],
  componentMocks: [],
  componentViewMocks: []
};

/**
 * @internal
 */
export function getSpectatorDefaultOptions<C>(overrides?: SpectatorOptions<C>): Required<SpectatorOptions<C>> {
  return merge(defaultSpectatorOptions, overrides);
}
