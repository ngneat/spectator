import { Type } from '@angular/core';
import {
  createTestComponentFactory as baseCreateTestComponentFactory,
  isType,
  Spectator as BaseSpectator,
  SpectatorFactory,
  SpectatorOptions,
  Token
} from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export function createTestComponentFactory<Component>(
  typeOrOptions: SpectatorOptions<Component> | Type<Component>
): SpectatorFactory<Component> {
  return baseCreateTestComponentFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions)
  });
}

export class Spectator<C> extends BaseSpectator<C> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}
