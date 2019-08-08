import { createHttpFactory } from '@netbasal/spectator';

import { BaseSpectator } from './base/base-spectator';
import { createServiceFactory } from './spectator-service/create-factory';
import { createHostComponentFactory } from './spectator-with-host/create-factory';
import { createTestComponentFactory } from './spectator/create-factory';

type Factory = (...args: unknown[]) => BaseSpectator;
type CreateFactory = (...args: unknown[]) => Factory;

interface SpectatorFactory {
  [key: string]: CreateFactory;
}

/**
 * @publicApi
 */
export const SpectatorFactory: SpectatorFactory = {
  forComponent: createTestComponentFactory,
  forComponentWithHost: createHostComponentFactory,
  forService: createServiceFactory,
  forHttp: createHttpFactory
};
