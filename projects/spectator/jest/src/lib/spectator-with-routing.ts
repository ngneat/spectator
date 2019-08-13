import { Type } from '@angular/core';
import {
  createRoutedComponentFactory as baseCreateRoutedComponentFactory,
  isType,
  HostComponent,
  SpectatorWithRouting as BaseSpectatorWithRouting,
  SpectatorWithRoutingFactory,
  SpectatorWithRoutingOptions,
  Token
} from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export class SpectatorWithRouting<C, H = HostComponent> extends BaseSpectatorWithRouting<C> {
  public get<T>(type: Token<T> | Token<any>, fromComponentInjector: boolean = false): SpyObject<T> {
    return super.get(type, fromComponentInjector) as SpyObject<T>;
  }
}

export function createRoutedComponentFactory<C>(typeOrOptions: SpectatorWithRoutingOptions<C> | Type<C>): SpectatorWithRoutingFactory<C> {
  return baseCreateRoutedComponentFactory({
    mockProvider,
    ...(isType(typeOrOptions) ? { component: typeOrOptions } : typeOrOptions)
  });
}
