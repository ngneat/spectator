/// <reference path="./lib/matchers-types.d.ts" />
export { Spectator } from './lib/spectator/spectator';
export { SpectatorOptions } from './lib/spectator/options';
export { createTestComponentFactory, SpectatorFactory, SpectatorOverrides } from './lib/spectator/create-factory';
export { initialSpectatorModule } from './lib/spectator/initial-module';

export { SpectatorWithHost } from './lib/spectator-with-host/spectator-with-host';
export { SpectatorWithHostOptions } from './lib/spectator-with-host/options';
export { createHostComponentFactory, SpectatorWithHostFactory } from './lib/spectator-with-host/create-factory';
export { initialSpectatorWithHostModule } from './lib/spectator-with-host/initial-module';
export { HostComponent, HostModule } from './lib/spectator-with-host/host-component';

export { SpectatorService } from './lib/spectator-service/spectator-service';
export { SpectatorServiceOptions } from './lib/spectator-service/options';
export { SpectatorServiceFactory, createServiceFactory, SpectatorServiceOverrides } from './lib/spectator-service/create-factory';
export { createService } from './lib/spectator-service/create-service';

export { SpectatorHttp, HttpMethod } from './lib/spectator-http/spectator-http';
export { SpectatorHttpOptions } from './lib/spectator-http/options';
export { SpectatorHttpFactory, createHttpFactory, CreateHttpOverrides } from './lib/spectator-http/create-factory';

export * from './lib/dom-selectors';
export { createHTTPFactory, SpectatorHTTP, HTTPMethod } from './lib/http';
export * from './lib/matchers';
export * from './lib/mock';
export * from './lib/token';
export * from './lib/types';
