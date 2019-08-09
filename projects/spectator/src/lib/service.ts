import { Type } from '@angular/core';

import { SpyObject } from './mock';
import { createServiceFactory } from './spectator-service/create-factory';
import { SpectatorServiceOptions } from './spectator-service/options';
import { SpectatorService, SpectatorService as NewSpectatorService } from './spectator-service/spectator-service';
import { Token } from './token';

/**
 * @deprecated Deprecated in favour of createServiceFactory(). Will be removed in Spectator 5.
 */
export function createService<S>(typeOrOptions: SpectatorServiceOptions<S> | Type<S>): SpectatorService<S> {
  // tslint:disable-next-line:no-shadowed-variable
  const createService = createServiceFactory<S>(typeOrOptions);
  let spectator: NewSpectatorService<S>;

  beforeEach(() => (spectator = createService()));

  return {
    get service(): S {
      return spectator.service;
    },
    get<T>(token: Token<T>): SpyObject<T> {
      return spectator.get(token);
    }
  };
}
