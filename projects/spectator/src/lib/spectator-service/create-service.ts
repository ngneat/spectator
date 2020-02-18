import { Type, InjectionToken, AbstractType } from '@angular/core';

import { SpyObject } from '../mock';
import { Token } from '../token';

import { createServiceFactory } from './create-factory';
import { SpectatorServiceOptions } from './options';
import { SpectatorService } from './spectator-service';

/**
 * @deprecated Deprecated in favour of createServiceFactory(). Will be removed in Spectator 5.
 */
export function createService<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorService<S> {
  const serviceFactory = createServiceFactory<S>(typeOrOptions);

  let spectator: SpectatorService<S>;

  beforeEach(() => (spectator = serviceFactory()));

  return {
    get service(): S {
      return spectator.service;
    },
    get<T>(token: Token<T>): SpyObject<T> {
      return spectator.get(token);
    },
    inject<T>(token: Token<T>): SpyObject<T> {
      return spectator.inject(token);
    }
  };
}
