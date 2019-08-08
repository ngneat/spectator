import { InjectionToken, Type } from '@angular/core';
import { createService as baseCreateService, ServiceParams, SpectatorService as BaseSpectatorService, Token } from '@netbasal/spectator';
import { SpyObject } from './mock';

export interface SpectatorService<S> extends BaseSpectatorService<S> {
  get<T>(token: Type<T> | InjectionToken<T>): T & SpyObject<T>;

  get<T>(token: Token<T> | Token<any>): T & SpyObject<T>;
}

export function createService<Service>(options: ServiceParams<Service> | Type<Service>): SpectatorService<Service> {
  return baseCreateService(options);
}
