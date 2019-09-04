import { Type } from '@angular/core';
import {
  createHostFactory as baseCreateHostFactory,
  isType,
  HostComponent,
  SpectatorHost as BaseSpectatorHost,
  SpectatorHostOptions,
  SpectatorHostOverrides,
  Token
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @deprecated Use SpectatorHost instead. To be removed in v5.
 */
export type SpectatorWithHost<C, H = HostComponent> = SpectatorHost<C, H>;

/**
 * @publicApi
 */
export class SpectatorHost<C, H = HostComponent> extends BaseSpectatorHost<C, H> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorHostFactory<C, H> = <HP extends H extends HostComponent ? any : Partial<H>>(
  template: string,
  overrides?: SpectatorHostOverrides<C, H, HP>
) => SpectatorHost<C, H & HP>;

/**
 * @deprecated Use createHostFactory instead. To be removed in v5.
 */
export function createHostComponentFactory<C, H = HostComponent>(
  typeOrOptions: Type<C> | SpectatorHostOptions<C, H>
): SpectatorHostFactory<C, H> {
  return createHostFactory<C, H>(typeOrOptions);
}

/**
 * @publicApi
 */
export function createHostFactory<C, H = HostComponent>(typeOrOptions: Type<C> | SpectatorHostOptions<C, H>): SpectatorHostFactory<C, H> {
  return baseCreateHostFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions)
  });
}
