import { createTestComponentFactory as baseCreateTestComponentFactory, Spectator as BaseSpectator, SpectatorOptions, Token } from '@netbasal/spectator';
import { Type } from '@angular/core';
import { CreateComponentOptions, isType } from '../../src/lib/types';
import { mockProvider, SpyObject } from './mock';

export function createTestComponentFactory<Component>(typeOrOptions: SpectatorOptions<Component> | Type<Component>): (options?: CreateComponentOptions<Component>) => Spectator<Component> {
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
