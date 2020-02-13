import { Type } from '@angular/core';
import {
  createComponentFactory as baseCreateComponentFactory,
  isType,
  Spectator as BaseSpectator,
  SpectatorOptions,
  SpectatorOverrides,
  Token
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export type SpectatorFactory<C> = (options?: SpectatorOverrides<C>) => Spectator<C>;

/**
 * @deprecated Use createComponentFactory instead. To be removed in v5.
 */
export function createTestComponentFactory<C>(typeOrOptions: SpectatorOptions<C> | Type<C>): SpectatorFactory<C> {
  return createComponentFactory<C>(typeOrOptions);
}

export function createComponentFactory<C>(typeOrOptions: SpectatorOptions<C> | Type<C>): SpectatorFactory<C> {
  return baseCreateComponentFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions)
  }) as SpectatorFactory<C>;
}

export class Spectator<C> extends BaseSpectator<C> {
  /**
   * @deprecated Deprecated in favour of inject(). Will be removed once TestBed.get is discontinued.
   * @param type Token
   */
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }

  public inject<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.inject(type, fromComponentInjector) as SpyObject<T>;
  }
}
