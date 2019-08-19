/// <reference path="./lib/matchers-types.d.ts" />
export { Spectator } from './lib/spectator/spectator';
export { SpectatorOptions } from './lib/spectator/options';
export { createTestComponentFactory, SpectatorFactory, SpectatorOverrides } from './lib/spectator/create-factory';
export { initialSpectatorModule } from './lib/spectator/initial-module';

export { SpectatorWithHost } from './lib/spectator-with-host/spectator-with-host';
export { SpectatorWithHostOptions } from './lib/spectator-with-host/options';
export { createHostComponentFactory, SpectatorWithHostFactory, SpectatorWithHostOverrides } from './lib/spectator-with-host/create-factory';
export { initialSpectatorWithHostModule } from './lib/spectator-with-host/initial-module';
export { HostComponent, HostModule } from './lib/spectator-with-host/host-component';

export { SpectatorForDirective } from './lib/spectator-for-directive/spectator-for-directive';
export { SpectatorForDirectiveOptions } from './lib/spectator-for-directive/options';
export {
  createHostDirectiveFactory,
  SpectatorForDirectiveFactory,
  SpectatorForDirectiveOverrides
} from './lib/spectator-for-directive/create-factory';
export { initialSpectatorForDirectiveModule } from './lib/spectator-for-directive/initial-module';

export { SpectatorService } from './lib/spectator-service/spectator-service';
export { SpectatorServiceOptions } from './lib/spectator-service/options';
export { SpectatorServiceFactory, createServiceFactory, SpectatorServiceOverrides } from './lib/spectator-service/create-factory';
export { createService } from './lib/spectator-service/create-service';

export { SpectatorWithRouting } from './lib/spectator-with-routing/spectator-with-routing';
export { SpectatorWithRoutingOptions } from './lib/spectator-with-routing/options';
export {
  SpectatorWithRoutingFactory,
  createRoutedComponentFactory,
  SpectatorWithRoutingOverrides
} from './lib/spectator-with-routing/create-factory';
export { ActivatedRouteStub } from './lib/spectator-with-routing/activated-route-stub';

export { SpectatorHttp, HttpMethod } from './lib/spectator-http/spectator-http';
export { SpectatorHttpOptions } from './lib/spectator-http/options';
export { SpectatorHttpFactory, createHttpFactory, CreateHttpOverrides } from './lib/spectator-http/create-factory';

export * from './lib/dom-selectors';
export { createHTTPFactory, SpectatorHTTP, HTTPMethod } from './lib/http';
export * from './lib/matchers';
export * from './lib/mock';
export * from './lib/token';
export * from './lib/types';
