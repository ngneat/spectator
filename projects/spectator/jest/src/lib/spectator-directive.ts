import { Type } from '@angular/core';
import {
  createDirectiveFactory as baseCreateDirectiveFactory,
  isType,
  HostComponent,
  SpectatorDirective as BaseSpectatorDirective,
  SpectatorDirectiveOptions,
  SpectatorDirectiveOverrides,
  Token
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorDirective<D, H = HostComponent> extends BaseSpectatorDirective<D, H> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorDirectiveFactory<D, H = HostComponent> = <HP>(
  template: string,
  overrides?: SpectatorDirectiveOverrides<D, H, HP>
) => SpectatorDirective<D, H & HostComponent extends H ? HP : unknown>;

/**
 * @publicApi
 */
export function createDirectiveFactory<D, H = HostComponent>(
  typeOrOptions: Type<D> | SpectatorDirectiveOptions<D, H>
): SpectatorDirectiveFactory<D, H> {
  return baseCreateDirectiveFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { directive: typeOrOptions } : typeOrOptions)
  }) as SpectatorDirectiveFactory<D, H>;
}
