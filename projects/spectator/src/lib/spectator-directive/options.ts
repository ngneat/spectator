import { Type } from '@angular/core';

import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';
import { BaseSpectatorOptions, getDefaultBaseOptions } from '../base/options';
import { HostComponent } from '../spectator-host/host-component';

/**
 * @publicApi
 */
export interface SpectatorDirectiveOptions<D = any, H = HostComponent> extends BaseSpectatorOptions {
  directive: Type<D>;
  shallow?: boolean;
  detectChanges?: boolean;
  host?: Type<H>;
  template?: string;
}

const defaultSpectatorRoutingOptions: OptionalsRequired<SpectatorDirectiveOptions> = {
  ...getDefaultBaseOptions(),
  host: HostComponent,
  template: '',
  shallow: false,
  detectChanges: true
};

/**
 * @internal
 */
export function getSpectatorDirectiveDefaultOptions<D, H>(
  overrides: SpectatorDirectiveOptions<D, H>
): Required<SpectatorDirectiveOptions<D, H>> {
  return merge(defaultSpectatorRoutingOptions, overrides) as Required<SpectatorDirectiveOptions<D, H>>;
}
