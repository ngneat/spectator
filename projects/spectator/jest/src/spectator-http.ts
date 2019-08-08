import { Type } from '@angular/core';
import { createHttpFactory as baseCreateHttpFactory, isType, CreateHttpOverrides, HttpMethod, SpectatorHttp as BaseSpectatorHttp, SpectatorHttpOptions, Token } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export interface SpectatorHttp<S> extends BaseSpectatorHttp<S> {
  get<T>(token: Token<T> | Token<any>): SpyObject<T>;
}

/**
 * @publicApi
 */
export { HttpMethod };

/**
 * @pubicApi
 */
export type SpectatorHttpFactory<S> = (overrides?: CreateHttpOverrides<S>) => SpectatorHttp<S>;

/**
 * @publicApi
 */
export function createHttpFactory<S>(typeOrOptions: SpectatorHttpOptions<S> | Type<S>): SpectatorHttpFactory<S> {
  return baseCreateHttpFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { dataService: typeOrOptions } : typeOrOptions)
  });
}
