import { Type, InjectionToken, AbstractType } from '@angular/core';
import {
  createRoutingFactory as baseCreateRoutingFactory,
  isType,
  SpectatorRouting as BaseSpectatorRouting,
  SpectatorRoutingOptions,
  SpectatorRoutingOverrides,
  Token
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorRouting<C> extends BaseSpectatorRouting<C> {
  /**
   * @deprecated Deprecated in favour of inject(). Will be removed once TestBed.get is discontinued.
   * @param type Token
   */
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }

  public inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, fromComponentInjector: boolean = false): SpyObject<T> {
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
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions)
  }) as SpectatorRoutingFactory<C>;
}
