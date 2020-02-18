import { Type, InjectionToken, AbstractType } from '@angular/core';
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
  /**
   * @deprecated Deprecated in favour of inject(). Will be removed once TestBed.get is discontinued.
   * @param type Token
   */
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }

  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.inject(token, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorHostFactory<C, H> = <HP>(
  template: string,
  overrides?: SpectatorHostOverrides<C, H, HP>
) => SpectatorHost<C, H & HostComponent extends H ? HP : unknown>;

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
  }) as SpectatorHostFactory<C, H>;
}
