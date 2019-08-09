import { ModuleMetadata } from '../base/initial-module';
import { HostComponent } from '../spectator-with-host/host-component';
import { initialSpectatorModule } from '../spectator/initial-module';

import { SpectatorWithHostOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorWithHostModule<C, H = HostComponent>(options: Required<SpectatorWithHostOptions<C>>): ModuleMetadata {
  const moduleMetadata = initialSpectatorModule<C>(options);

  moduleMetadata.declarations.push(options.host);

  return moduleMetadata;
}
