import { ModuleMetadata } from '../base/initial-module';
import { initialSpectatorModule } from '../spectator/initial-module';

import { SpectatorHostOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorWithHostModule<C, H>(options: Required<SpectatorHostOptions<C, H>>): ModuleMetadata {
  const moduleMetadata = initialSpectatorModule<C>(options);

  moduleMetadata.declarations.push(options.host);

  return moduleMetadata;
}
