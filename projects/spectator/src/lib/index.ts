export { Spectator } from './spectator/spectator';
export { SpectatorOptions } from './spectator/options';
export { createTestComponentFactory, SpectatorFactory, SpectatorOverrides } from './spectator/create-factory';
export { initialSpectatorModule } from './spectator/initial-module';
export { HostComponent } from './spectator/host-component';

export { SpectatorWithHost } from './spectator-with-host/spectator-with-host';
export { createHostComponentFactory, SpectatorWithHostFactory } from './spectator-with-host/create-factory';

export { SpectatorService } from './spectator-service/spectator-service';
export { SpectatorServiceOptions } from './spectator-service/options';
export { SpectatorServiceFactory, createServiceFactory, CreateServiceOverrides } from './spectator-service/create-factory';

// @deprecated - Will be removed in v5
export { createService } from './service';

export * from './dom-selectors';
export * from './http';
export * from './matchers';
export * from './spectator-factory';
export * from './mock';
export * from './token';
export * from './types';
