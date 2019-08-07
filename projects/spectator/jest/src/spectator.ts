import { createTestComponentFactory as baseCreateTestComponentFactory, SpectatorOptions } from '@netbasal/spectator';
import { Type } from '@angular/core';
import { Spectator } from './internals';
import { CreateComponentOptions } from '../../src/lib/types';

export function createTestComponentFactory<Component>(typeOrOptions: SpectatorOptions<Component> | Type<Component>): (options?: CreateComponentOptions<Component>) => Spectator<Component> {
  return baseCreateTestComponentFactory(typeOrOptions);
}
