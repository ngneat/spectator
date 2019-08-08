import { Type } from '@angular/core';
import { CreateComponentOptions, createHostComponentFactory as baseCreateHostComponentFactory, HostComponent, isType, SpectatorOptions, SpectatorWithHost as BaseSpectatorWithHost, Token } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export class SpectatorWithHost<C, H = HostComponent> extends BaseSpectatorWithHost<C, H> {
  get<T>(type: Token<T> | Token<any>, fromComponentInjector = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

export function createHostComponentFactory<Component, Host = HostComponent>(typeOrOptions: SpectatorOptions<Component, Host> | Type<Component>): (template: string, options?: CreateComponentOptions<Component>) => SpectatorWithHost<Component, Host> {
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
