import { Type } from '@angular/core';
import {
  createRoutingFactory as baseCreateRoutingFactory,
  isType,
  SpectatorRouting as BaseSpectatorRouting,
  SpectatorRoutingOptions,
  SpectatorRoutingOverrides,
  Token,
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorRouting<C> extends BaseSpectatorRouting<C> {
  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.inject(token, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorRoutingFactory<C> = (overrides?: SpectatorRoutingOverrides<C>) => SpectatorRouting<C>;

/**
 * @publicApi
 */
export function createRoutingFactory<C>(typeOrOptions: SpectatorRoutingOptions<C> | Type<C>): SpectatorRoutingFactory<C> {
  return baseCreateRoutingFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions),
  }) as SpectatorRoutingFactory<C>;
}
