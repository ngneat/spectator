import { Provider, Type } from '@angular/core';

import { BaseSpectatorOptions, getDefaultBaseOptions } from '../base/options';
import { merge } from '../internals/merge';
import { HostComponent } from '../spectator-host/host-component';
import { OptionalsRequired } from '../types';

/**
 * @publicApi
 */
export interface SpectatorDirectiveOptions<D, H> extends BaseSpectatorOptions {
  directive: Type<D>;
  shallow?: boolean;
  detectChanges?: boolean;
  host?: Type<H>;
  template?: string;
  directiveProviders?: Provider[];
  directiveMocks?: Type<any>[];
  declareDirective?: boolean;
}

const defaultSpectatorRoutingOptions: OptionalsRequired<SpectatorDirectiveOptions<any, any>> = {
  ...getDefaultBaseOptions(),
  host: HostComponent,
  template: '',
  shallow: false,
  detectChanges: true,
  directiveProviders: [],
  directiveMocks: [],
  declareDirective: true
};

/**
 * @internal
 */
export function getSpectatorDirectiveDefaultOptions<D, H>(
  overrides?: SpectatorDirectiveOptions<D, H>
): Required<SpectatorDirectiveOptions<D, H>> {
  return merge(defaultSpectatorRoutingOptions, overrides);
}
