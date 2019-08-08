import { Type } from '@angular/core';
import { createTestComponentFactory as baseCreateTestComponentFactory, isType, Spectator as BaseSpectator, SpectatorFactory, SpectatorOptions, Token } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export function createTestComponentFactory<Component>(typeOrOptions: SpectatorOptions<Component> | Type<Component>): SpectatorFactory<Component> {
  return baseCreateTestComponentFactory(
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

export class Spectator<C> extends BaseSpectator<C> {
  get<T>(type: Token<T> | Token<any>, fromComponentInjector = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}
