import { Type } from '@angular/core';
import { createService as baseCreateService, isType, ServiceOptions, SpectatorService as BaseSpectatorService, Token } from '@netbasal/spectator';
import { mockProvider, SpyObject } from './mock';

export interface SpectatorService<S> extends BaseSpectatorService<S> {
  get<T>(token: Token<T> | Token<any>): SpyObject<T>;
}

export function createService<Service>(typeOrOptions: ServiceOptions<Service> | Type<Service>): SpectatorService<Service> {
  return baseCreateService(
    isType(typeOrOptions)
      ? {
          mockProvider: mockProvider,
          service: typeOrOptions
        }
      : {
          mockProvider: mockProvider,
          ...typeOrOptions
        }
  );
}
