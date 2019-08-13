import { Type } from '@angular/core';
import {
  createRoutedComponentFactory as baseCreateRoutedComponentFactory,
  isType,
  SpectatorWithRouting as BaseSpectatorWithRouting,
  SpectatorWithRoutingOptions,
  SpectatorWithRoutingOverrides,
  Token
} from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorWithRouting<C> extends BaseSpectatorWithRouting<C> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorWithRoutingFactory<C> = (overrides?: SpectatorWithRoutingOverrides<C>) => SpectatorWithRouting<C>;

/**
 * @publicApi
 */
export function createRoutedComponentFactory<C>(typeOrOptions: SpectatorWithRoutingOptions<C> | Type<C>): SpectatorWithRoutingFactory<C> {
  return baseCreateRoutedComponentFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions)
  }) as SpectatorWithRoutingFactory<C>;
}
