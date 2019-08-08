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
 * @deprecated Deprecated in favour of createServiceFactory(). Will be removed in Spectator 5.
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
export function createServiceFactory<Service>(typeOrOptions: SpectatorServiceOptions<Service> | Type<Service>): SpectatorServiceFactory<Service> {
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
