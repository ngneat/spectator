import { AbstractType, InjectionToken, Type } from '@angular/core';
import {
  createInjectionContextFactory as baseInjectionContextFactory,
  SpectatorInjectionContextOverrides,
  SpectatorInjectionContextOptions,
  SpectatorInjectionContext as BaseSpectatorInjectionContext,
} from '@ngneat/spectator';
import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export interface SpectatorInjectionContext extends BaseSpectatorInjectionContext {
  inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>): SpyObject<T>;
}

/**
 * @publicApi
 */
export type SpectatorInjectionContextFactory = (overrides?: SpectatorInjectionContextOverrides) => SpectatorInjectionContext;

/**
 * @publicApi
 */
export function createInjectionContextFactory(options: SpectatorInjectionContextOptions): SpectatorInjectionContextFactory {
  return baseInjectionContextFactory({
    mockProvider,
    ...options,
  }) as SpectatorInjectionContextFactory;
}
