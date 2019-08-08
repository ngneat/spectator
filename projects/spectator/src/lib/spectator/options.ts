import { Type } from '@angular/core';

import { getDefaultBaseOptions, BaseSpectatorOptions } from '../base/options';
import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';

import { HostComponent } from './host-component';

/**
 * @publicApi
 */
export interface SpectatorOptions<C = any, H = HostComponent> extends BaseSpectatorOptions {
  component: Type<C>;
  shallow?: boolean;
  host?: Type<H>;
  componentProviders?: any[];
  detectChanges?: boolean;
  declareComponent?: boolean;
}

const defaultSpectatorOptions: OptionalsRequired<SpectatorOptions> = {
  ...getDefaultBaseOptions(),
  shallow: false,
  host: HostComponent,
  declareComponent: true,
  detectChanges: true,
  componentProviders: []
};

/**
 * @internal
 */
export function getSpectatorDefaultOptions<C, H>(overrides: SpectatorOptions<C, H>): Required<SpectatorOptions<C, H>> {
  return merge(defaultSpectatorOptions, overrides) as Required<SpectatorOptions<C, H>>;
}
