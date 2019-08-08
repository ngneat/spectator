import { Type } from '@angular/core';
import { createHostComponentFactory as baseCreateHostComponentFactory, isType, HostComponent, SpectatorOptions, SpectatorWithHost as BaseSpectatorWithHost, SpectatorWithHostFactory, Token } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export class SpectatorWithHost<C, H = HostComponent> extends BaseSpectatorWithHost<C, H> {
  get<T>(type: Token<T> | Token<any>, fromComponentInjector = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

export function createHostComponentFactory<C, H = HostComponent>(typeOrOptions: SpectatorOptions<C, H> | Type<C>): SpectatorWithHostFactory<C, H> {
  return baseCreateHostComponentFactory(
    isType(typeOrOptions)
      ? {
          mockProvider: mockProvider,
          component: typeOrOptions
        }
      : {
          mockProvider: mockProvider,
          ...typeOrOptions
        }
  );
}
