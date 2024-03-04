import { Type } from '@angular/core';

import { merge } from '../internals/merge';
import { getSpectatorDefaultOptions, SpectatorOptions } from '../spectator/options';
import { OptionalsRequired } from '../types';

import { HostComponent } from './host-component';

/**
 * @publicApi
 */
export interface SpectatorHostOptions<C, H> extends SpectatorOptions<C> {
  host?: Type<H>;
  template?: string;
}

const defaultSpectatorHostOptions: OptionalsRequired<SpectatorHostOptions<any, any>> = {
  ...getSpectatorDefaultOptions<any>(),
  host: HostComponent,
  template: '',
};

/**
 * @internal
 */
export function getSpectatorHostDefaultOptions<C, H>(overrides?: SpectatorHostOptions<C, H>): Required<SpectatorHostOptions<C, H>> {
  return merge(defaultSpectatorHostOptions, overrides);
}
