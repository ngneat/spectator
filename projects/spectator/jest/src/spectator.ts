import { createTestComponentFactory as baseCreateTestComponentFactory, isType, SpectatorOptions } from '@netbasal/spectator';
import { Type } from '@angular/core';
import { Spectator } from './internals';
import { CreateComponentOptions } from '../../src/lib/types';
import { mockProvider } from './mock';

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
