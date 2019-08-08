import { Type } from '@angular/core';
import { createService as baseCreateService, createServiceFactory as baseCreateServiceFactory, isType, CreateServiceOverrides, SpectatorServiceOptions, SpectatorService as BaseSpectatorService, Token } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export interface SpectatorService<S> extends BaseSpectatorService<S> {
  get<T>(token: Token<T> | Token<any>): SpyObject<T>;
}

/**
 * @pubicApi
 */
export type SpectatorServiceFactory<S> = (overrides?: CreateServiceOverrides<S>) => SpectatorService<S>;

/**
 * @publicApi
 */
export function createService<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorService<S> {
  return baseCreateService(
    isType(typeOrOptions)
      ? {
          mockProvider: mockProvider,
          service: typeOrOptions
        }
      : {
          mockProvider: mockProvider,
          ...typeOrOptions
        }
  );
}

/**
 * @publicApi
 */
export function createServiceFactory<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorServiceFactory<S> {
  return baseCreateServiceFactory(
    isType(typeOrOptions)
      ? {
          mockProvider: mockProvider,
          service: typeOrOptions
        }
      : {
          mockProvider: mockProvider,
          ...typeOrOptions
        }
  );
}
