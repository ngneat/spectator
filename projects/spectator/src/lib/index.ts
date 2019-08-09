export { Spectator } from './spectator/spectator';
export { SpectatorOptions } from './spectator/options';
export { createTestComponentFactory, SpectatorFactory, SpectatorOverrides } from './spectator/create-factory';
export { initialSpectatorModule } from './spectator/initial-module';

export { SpectatorWithHost } from './spectator-with-host/spectator-with-host';
export { SpectatorWithHostOptions } from './spectator-with-host/options';
export { createHostComponentFactory, SpectatorWithHostFactory } from './spectator-with-host/create-factory';
export { initialSpectatorWithHostModule } from './spectator-with-host/initial-module';
export { HostComponent } from './spectator-with-host/host-component';

export { SpectatorService } from './spectator-service/spectator-service';
export { SpectatorServiceOptions } from './spectator-service/options';
export { SpectatorServiceFactory, createServiceFactory, SpectatorServiceOverrides } from './spectator-service/create-factory';
export { createService } from './spectator-service/create-service';

export { SpectatorWithRouting } from './spectator-with-routing/spectator-with-routing';
export { SpectatorWithRoutingOptions } from './spectator-with-routing/options';
export { SpectatorWithRoutingFactory, createRoutedComponentFactory, SpectatorWithRoutingOverrides } from './spectator-with-routing/create-factory';
export { ActivatedRouteStub } from './spectator-with-routing/activated-route-stub';

export { SpectatorHttp, HttpMethod } from './spectator-http/spectator-http';
export { SpectatorHttpOptions } from './spectator-http/options';
export { SpectatorHttpFactory, createHttpFactory, CreateHttpOverrides } from './spectator-http/create-factory';

export * from './dom-selectors';
export { createHTTPFactory, SpectatorHTTP, HTTPMethod } from './http';
export * from './matchers';
export * from './mock';
export * from './token';
export * from './types';
