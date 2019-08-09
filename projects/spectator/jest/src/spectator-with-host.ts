import { Type } from '@angular/core';
import { createHostComponentFactory as baseCreateHostComponentFactory, isType, HostComponent, SpectatorWithHost as BaseSpectatorWithHost, SpectatorWithHostFactory, SpectatorWithHostOptions, Token } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export class SpectatorWithHost<C, H = HostComponent> extends BaseSpectatorWithHost<C, H> {
  get<T>(type: Token<T> | Token<any>, fromComponentInjector = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

export function createHostComponentFactory<C, H = HostComponent>(typeOrOptions: SpectatorWithHostOptions<C, H> | Type<C>): SpectatorWithHostFactory<C, H> {
  return baseCreateHostComponentFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions)
  });
}
