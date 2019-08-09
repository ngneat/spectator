import { Type } from '@angular/core';

import { merge } from '../internals/merge';
import { getSpectatorDefaultOptions, SpectatorOptions } from '../spectator/options';
import { OptionalsRequired } from '../types';

import { HostComponent } from './host-component';

/**
 * @publicApi
 */
export interface SpectatorWithHostOptions<C = any, H = HostComponent> extends SpectatorOptions<C> {
  host?: Type<H>;
  template?: string;
}

const defaultSpectatorWithHostOptions: OptionalsRequired<SpectatorWithHostOptions> = {
  ...getSpectatorDefaultOptions(),
  host: HostComponent,
  template: ''
};

/**
 * @internal
 */
export function getSpectatorWithHostDefaultOptions<C, H>(overrides: SpectatorWithHostOptions<C, H>): Required<SpectatorWithHostOptions<C, H>> {
  return merge(defaultSpectatorWithHostOptions, overrides) as Required<SpectatorWithHostOptions<C, H>>;
}
