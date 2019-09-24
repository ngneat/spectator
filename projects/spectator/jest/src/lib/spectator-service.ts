import { Type } from '@angular/core';
import {
  createService as baseCreateService,
  createServiceFactory as baseCreateServiceFactory,
  isType,
  SpectatorServiceOverrides,
  SpectatorServiceOptions,
  SpectatorService as BaseSpectatorService,
  Token
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export interface SpectatorService<S> extends BaseSpectatorService<S> {
  get<T>(token: Token<T> | Token<any>): SpyObject<T>;
}

/**
 * @publicApi
 */
export type SpectatorServiceFactory<S> = (overrides?: SpectatorServiceOverrides<S>) => SpectatorService<S>;

/**
 * @deprecated Deprecated in favour of createServiceFactory(). Will be removed in Spectator 5.
 */
export function createService<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorService<S> {
  return baseCreateService({
    mockProvider,
    ...(isType(typeOrOptions) ? { service: typeOrOptions } : typeOrOptions)
  }) as SpectatorService<S>;
}

/**
 * @publicApi
 */
export function createServiceFactory<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorServiceFactory<S> {
  return baseCreateServiceFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { service: typeOrOptions } : typeOrOptions)
  }) as SpectatorServiceFactory<S>;
}
