import { Type } from '@angular/core';
import {
  createHostDirectiveFactory as baseCreateHostDirectiveFactory,
  isType,
  HostComponent,
  SpectatorForDirective as BaseSpectatorForDirective,
  SpectatorForDirectiveOptions,
  SpectatorForDirectiveOverrides,
  Token
} from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorForDirective<C, H = HostComponent> extends BaseSpectatorForDirective<C, H> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorForDirectiveFactory<C, H> = (
  template: string,
  overrides?: SpectatorForDirectiveOverrides<C, H>
) => SpectatorForDirective<C, H>;

/**
 * @publicApi
 */
export function createHostDirectiveFactory<C, H = HostComponent>(
  typeOrOptions: SpectatorForDirectiveOptions<C, H> | Type<C>
): SpectatorForDirectiveFactory<C, H> {
  return baseCreateHostDirectiveFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { directive: typeOrOptions } : typeOrOptions)
  });
}
