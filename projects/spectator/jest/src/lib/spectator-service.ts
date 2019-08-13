import { Type } from '@angular/core';
import {
  createService as baseCreateService,
  createServiceFactory as baseCreateServiceFactory,
  isType,
  SpectatorServiceOverrides,
  SpectatorServiceOptions,
  SpectatorService as BaseSpectatorService,
  Token
} from '@netbasal/spectator';

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
 * @publicApi
 */
export function createService<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorService<S> {
  return baseCreateService({
    mockProvider,
    ...(isType(typeOrOptions) ? { service: typeOrOptions } : typeOrOptions)
  });
}

/**
 * @publicApi
 */
export function createServiceFactory<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorServiceFactory<S> {
  return baseCreateServiceFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { service: typeOrOptions } : typeOrOptions)
  });
}
