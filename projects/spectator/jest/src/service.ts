import { Type } from '@angular/core';
import { createService as baseCreateService, ServiceParams, SpectatorService as BaseSpectatorService } from '@netbasal/spectator';

export interface SpectatorService<Service> extends BaseSpectatorService<Service> {}

export function createService<Service>(options: ServiceParams<Service> | Type<Service>): SpectatorService<Service> {
  return baseCreateService(options);
}
