import { Type } from '@angular/core';
import {
  createDirectiveFactory as baseCreateDirectiveFactory,
  isType,
  HostComponent,
  SpectatorDirective as BaseSpectatorDirective,
  SpectatorDirectiveOptions,
  SpectatorDirectiveOverrides,
  Token
} from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorDirective<C, H = HostComponent> extends BaseSpectatorDirective<C, H> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorDirectiveFactory<C, H> = (template: string, overrides?: SpectatorDirectiveOverrides<C, H>) => SpectatorDirective<C, H>;

/**
 * @publicApi
 */
export function createDirectiveFactory<C, H = HostComponent>(
  typeOrOptions: SpectatorDirectiveOptions<C, H> | Type<C>
): SpectatorDirectiveFactory<C, H> {
  return baseCreateDirectiveFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { directive: typeOrOptions } : typeOrOptions)
  });
}
