import { Type } from '@angular/core';
import {
  createHostComponentFactory as baseCreateHostComponentFactory,
  isType,
  HostComponent,
  SpectatorWithHost as BaseSpectatorWithHost,
  SpectatorWithHostOptions,
  SpectatorWithHostOverrides,
  Token
} from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorWithHost<C, H = HostComponent> extends BaseSpectatorWithHost<C, H> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorWithHostFactory<C, H> = (template: string, overrides?: SpectatorWithHostOverrides<C, H>) => SpectatorWithHost<C, H>;
/**
 * @publicApi
 */
export function createHostComponentFactory<C, H = HostComponent>(
  typeOrOptions: SpectatorWithHostOptions<C, H> | Type<C>
): SpectatorWithHostFactory<C, H> {
  return baseCreateHostComponentFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions)
  }) as SpectatorWithHostFactory<C, H>;
}
