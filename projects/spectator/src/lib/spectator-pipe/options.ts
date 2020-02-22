import { Type } from '@angular/core';

import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';
import { BaseSpectatorOptions, getDefaultBaseOptions } from '../base/options';
import { HostComponent } from '../spectator-host/host-component';

/**
 * @publicApi
 */
export interface SpectatorPipeOptions<P, H> extends BaseSpectatorOptions {
  pipe: Type<P>;
  host?: Type<H>;
  detectChanges?: boolean;
  template?: string;
}

const defaultSpectatorPipeOptions: OptionalsRequired<SpectatorPipeOptions<any, any>> = {
  ...getDefaultBaseOptions(),
  host: HostComponent,
  detectChanges: true,
  template: ''
};

/**
 * @internal
 */
export function getSpectatorPipeDefaultOptions<P, H>(overrides?: SpectatorPipeOptions<P, H>): Required<SpectatorPipeOptions<P, H>> {
  return merge(defaultSpectatorPipeOptions, overrides);
}
