import { FactoryProvider, Type } from '@angular/core';

import { createHttpFactory, CreateHttpOverrides } from './spectator-http/create-factory';

import { HttpMethod as HTTPMethod, SpectatorHttp } from './spectator-http/spectator-http';

/**
 * @deprecated Deprecated in favour of createHttpFactory
 */
export function createHTTPFactory<S>(dataService: Type<S>, providers: FactoryProvider[] = []): (overrides?: CreateHttpOverrides<S>) => SpectatorHTTP<S> {
  const createHttp = createHttpFactory({
    dataService,
    providers
  });

  return () => {
    const spectator = createHttp();

    return {
      dataService: spectator.dataService,
      controller: spectator.controller,
      httpClient: spectator.httpClient,
      expectOne: spectator.expectOne.bind(spectator),
      get: spectator.get.bind(spectator)
    };
  };
}

/**
 * @deprecated Deprecated in favour of SpectatorHttp
 */
export type SpectatorHTTP<S> = SpectatorHttp<S>;

export {
  /**
   * @deprecated Deprecated in favour of HttpMethod
   */
  HTTPMethod
};
