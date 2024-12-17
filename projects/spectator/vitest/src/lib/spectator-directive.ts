import { Type } from '@angular/core';
import {
  createDirectiveFactory as baseCreateDirectiveFactory,
  SpectatorDirective as BaseSpectatorDirective,
  HostComponent,
  isType,
  SpectatorDirectiveOptions,
  SpectatorDirectiveOverrides,
  Token,
} from '@ngneat/spectator';

import { mockProvider, SpyObject } from './mock';

/**
 * @publicApi
 */
export class SpectatorDirective<D, H = HostComponent> extends BaseSpectatorDirective<D, H> {
  public inject<T>(token: Token<T>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.inject(token, fromComponentInjector) as SpyObject<T>;
  }
}

/**
 * @publicApi
 */
export type SpectatorDirectiveFactory<D, H = HostComponent> = <HP>(
  template: string,
  overrides?: SpectatorDirectiveOverrides<H, HP>,
) => SpectatorDirective<D, H & HostComponent extends H ? HP : unknown>;

/**
 * @publicApi
 */
export type PresetSpectatorDirectiveFactory<D, H> = <HP>(
  template?: string,
  overrides?: SpectatorDirectiveOverrides<H, HP>,
) => SpectatorDirective<D, H & HostComponent extends H ? HP : unknown>;

/**
 * @publicApi
 */
export function createDirectiveFactory<D, H = HostComponent>(
  options: SpectatorDirectiveOptions<D, H> & { template: string },
): PresetSpectatorDirectiveFactory<D, H>;
/**
 * @publicApi
 */
export function createDirectiveFactory<D, H = HostComponent>(
  typeOrOptions: Type<D> | SpectatorDirectiveOptions<D, H>,
): SpectatorDirectiveFactory<D, H>;
export function createDirectiveFactory<D, H = HostComponent>(
  typeOrOptions: Type<D> | SpectatorDirectiveOptions<D, H>,
): SpectatorDirectiveFactory<D, H> {
  return baseCreateDirectiveFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { directive: typeOrOptions } : typeOrOptions),
  }) as SpectatorDirectiveFactory<D, H>;
}
