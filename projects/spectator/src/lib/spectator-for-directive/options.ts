import { Type } from '@angular/core';

import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';
import { BaseSpectatorOptions, getDefaultBaseOptions } from '../base/options';
import { HostComponent } from '../spectator-with-host/host-component';

/**
 * @publicApi
 */
export interface SpectatorForDirectiveOptions<D = any, H = HostComponent> extends BaseSpectatorOptions {
  directive: Type<D>;
  shallow?: boolean;
  detectChanges?: boolean;
  host?: Type<H>;
  template?: string;
}

const defaultSpectatorWithHostOptions: OptionalsRequired<SpectatorForDirectiveOptions> = {
  ...getDefaultBaseOptions(),
  host: HostComponent,
  template: '',
  shallow: false,
  detectChanges: true
};

/**
 * @internal
 */
export function getSpectatorForDirectiveDefaultOptions<D, H>(
  overrides: SpectatorForDirectiveOptions<D, H>
): Required<SpectatorForDirectiveOptions<D, H>> {
  return merge(defaultSpectatorWithHostOptions, overrides) as Required<SpectatorForDirectiveOptions<D, H>>;
}
