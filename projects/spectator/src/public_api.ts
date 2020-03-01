/// <reference path="./lib/matchers-types.d.ts" />
export { Spectator } from './lib/spectator/spectator';
export { SpectatorOptions } from './lib/spectator/options';
export { createTestComponentFactory, createComponentFactory, SpectatorFactory, SpectatorOverrides } from './lib/spectator/create-factory';
export { initialSpectatorModule } from './lib/spectator/initial-module';

export { SpectatorWithHost, SpectatorHost } from './lib/spectator-host/spectator-host';
export { SpectatorHostOptions } from './lib/spectator-host/options';
export {
  createHostComponentFactory,
  createHostFactory,
  SpectatorHostFactory,
  SpectatorHostOverrides
} from './lib/spectator-host/create-factory';
export { initialSpectatorWithHostModule } from './lib/spectator-host/initial-module';
export { HostComponent, HostModule } from './lib/spectator-host/host-component';

export { SpectatorDirective } from './lib/spectator-directive/spectator-directive';
export { SpectatorDirectiveOptions } from './lib/spectator-directive/options';
export { createDirectiveFactory, SpectatorDirectiveFactory, SpectatorDirectiveOverrides } from './lib/spectator-directive/create-factory';
export { initialSpectatorDirectiveModule } from './lib/spectator-directive/initial-module';

export { SpectatorService } from './lib/spectator-service/spectator-service';
export { SpectatorServiceOptions } from './lib/spectator-service/options';
export { SpectatorServiceFactory, createServiceFactory, SpectatorServiceOverrides } from './lib/spectator-service/create-factory';
export { createService } from './lib/spectator-service/create-service';

export { SpectatorRouting } from './lib/spectator-routing/spectator-routing';
export { SpectatorRoutingOptions } from './lib/spectator-routing/options';
export { SpectatorRoutingFactory, createRoutingFactory, SpectatorRoutingOverrides } from './lib/spectator-routing/create-factory';
export { ActivatedRouteStub } from './lib/spectator-routing/activated-route-stub';

export { SpectatorHttp, HttpMethod } from './lib/spectator-http/spectator-http';
export { SpectatorHttpOptions } from './lib/spectator-http/options';
export { SpectatorHttpFactory, createHttpFactory, CreateHttpOverrides } from './lib/spectator-http/create-factory';

export { SpectatorPipe } from './lib/spectator-pipe/spectator-pipe';
export { SpectatorPipeOptions } from './lib/spectator-pipe/options';
export { createPipeFactory, SpectatorPipeFactory, SpectatorPipeOverrides } from './lib/spectator-pipe/create-factory';
export { initialSpectatorPipeModule } from './lib/spectator-pipe/initial-module';

export * from './lib/dom-selectors';
export { createHTTPFactory, SpectatorHTTP, HTTPMethod } from './lib/http';
export * from './lib/matchers';
export * from './lib/mock';
export * from './lib/token';
export * from './lib/types';
export { typeInElement } from './lib/type-in-element';
export { defineGlobalsInjections } from './lib/globals-injections';
export { dispatchEvent, dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent, dispatchTouchEvent } from './lib/dispatch-events';
export { MockComponentDeprecated, MockDirectiveDeprecated } from './lib/deprecated';
