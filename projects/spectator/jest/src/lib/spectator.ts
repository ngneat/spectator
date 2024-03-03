import { Type } from '@angular/core';
import {
  createComponentFactory as baseCreateComponentFactory,
  isType,
  Spectator as BaseSpectator,
  SpectatorOptions,
  SpectatorOverrides,
  Token,
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export type SpectatorFactory<C> = (options?: SpectatorOverrides<C>) => Spectator<C>;

export function createComponentFactory<C>(typeOrOptions: SpectatorOptions<C> | Type<C>): SpectatorFactory<C> {
  return baseCreateComponentFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions),
  }) as SpectatorFactory<C>;
}

export class Spectator<C> extends BaseSpectator<C> {
  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.inject(token, fromComponentInjector) as SpyObject<T>;
  }
}
