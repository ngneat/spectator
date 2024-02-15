import { Type } from '@angular/core';
import {
  createHostFactory as baseCreateHostFactory,
  SpectatorHost as BaseSpectatorHost,
  HostComponent,
  isType,
  SpectatorHostOptions,
  SpectatorHostOverrides,
  Token,
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorHost<C, H = HostComponent> extends BaseSpectatorHost<C, H> {
  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.inject(token, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorHostFactory<C, H> = <HP>(
  template: string,
  overrides?: SpectatorHostOverrides<H, HP>
) => SpectatorHost<C, H & HostComponent extends H ? HP : unknown>;

/**
 * @publicApi
 */
export type PresetSpectatorHostFactory<C, H> = <HP>(
  template?: string,
  overrides?: SpectatorHostOverrides<H, HP>
) => SpectatorHost<C, H & (HostComponent extends H ? HP : unknown)>;

/**
 * @publicApi
 */
export function createHostFactory<C, H = HostComponent>(
  options: SpectatorHostOptions<C, H> & { template: string }
): PresetSpectatorHostFactory<C, H>;
/**
 * @publicApi
 */
export function createHostFactory<C, H = HostComponent>(typeOrOptions: Type<C> | SpectatorHostOptions<C, H>): SpectatorHostFactory<C, H>;
export function createHostFactory<C, H = HostComponent>(typeOrOptions: Type<C> | SpectatorHostOptions<C, H>): SpectatorHostFactory<C, H> {
  return baseCreateHostFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions),
  }) as SpectatorHostFactory<C, H>;
}
