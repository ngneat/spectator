import { ModuleMetadata } from '../base/initial-module';
import { initialSpectatorModule } from '../spectator/initial-module';

import { HostComponent } from './/host-component';
import { SpectatorHostOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorWithHostModule<C, H = HostComponent>(options: Required<SpectatorHostOptions<C>>): ModuleMetadata {
  const moduleMetadata = initialSpectatorModule<C>(options);

  moduleMetadata.declarations.push(options.host);

  return moduleMetadata;
}
