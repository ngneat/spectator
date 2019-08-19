import { Type } from '@angular/core';
import {
  createComponentFactory as baseCreateComponentFactory,
  isType,
  Spectator as BaseSpectator,
  SpectatorFactory,
  SpectatorOptions,
  Token
} from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

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
  });
}

export class Spectator<C> extends BaseSpectator<C> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}
