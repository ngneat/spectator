import { Type } from '@angular/core';
import {
  createPipeFactory as baseCreatePipeFactory,
  isType,
  HostComponent,
  SpectatorPipe as BaseSpectatorPipe,
  SpectatorPipeOptions,
  SpectatorPipeOverrides,
  Token
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorPipe<P, H = HostComponent> extends BaseSpectatorPipe<P, H> {
  /**
   * @deprecated Deprecated in favour of inject(). Will be removed once TestBed.get is discontinued.
   * @param type Token
   */
  public get<T>(type: Token<T> | Token<any>): SpyObject<T> {
    return super.get(type) as SpyObject<T>;
  }

  public inject<T>(token: Token<T>): SpyObject<T> {
    return super.inject(token) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorPipeFactory<P, H> = <HP>(
  templateOrOverrides?: string | SpectatorPipeOverrides<H, HP>,
  overrides?: SpectatorPipeOverrides<H, HP>
) => SpectatorPipe<P, H & (HostComponent extends H ? HP : unknown)>;

/**
 * @publicApi
 */
export function createPipeFactory<P, H = HostComponent>(typeOrOptions: Type<P> | SpectatorPipeOptions<P, H>): SpectatorPipeFactory<P, H> {
  return baseCreatePipeFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { pipe: typeOrOptions } : typeOrOptions)
  }) as SpectatorPipeFactory<P, H>;
}
