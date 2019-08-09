import { BaseSpectator } from '../base/base-spectator';

/**
 * @publicApi
 */
export class SpectatorService<S> extends BaseSpectator {
  constructor(public service: S) {
    super();
  }
}
