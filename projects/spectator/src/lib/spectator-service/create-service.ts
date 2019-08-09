import { Type } from '@angular/core';

import { SpyObject } from '../mock';
import { Token } from '../token';

import { createServiceFactory } from './create-factory';
import { SpectatorServiceOptions } from './options';
import { SpectatorService } from './spectator-service';

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
    }
  };
}
