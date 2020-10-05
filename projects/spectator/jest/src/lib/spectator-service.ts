import { Type, InjectionToken, AbstractType } from '@angular/core';
import {
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
  inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>): SpyObject<T>;
}

/**
 * @publicApi
 */
export type SpectatorServiceFactory<S> = (overrides?: SpectatorServiceOverrides<S>) => SpectatorService<S>;

/**
 * @publicApi
 */
export function createServiceFactory<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorServiceFactory<S> {
  return baseCreateServiceFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { service: typeOrOptions } : typeOrOptions)
  }) as SpectatorServiceFactory<S>;
}
