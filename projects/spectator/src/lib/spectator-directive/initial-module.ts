import { NO_ERRORS_SCHEMA } from '@angular/core';

import { initialModule, ModuleMetadata } from '../base/initial-module';
import { HostComponent } from '../spectator-host/host-component';

import { SpectatorDirectiveOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorDirectiveModule<D, H>(options: Required<SpectatorDirectiveOptions<D, H>>): ModuleMetadata {
  const moduleMetadata = initialModule(options);

  moduleMetadata.declarations.push(options.directive);
  moduleMetadata.declarations.push(options.host);

  moduleMetadata.schemas = [options.shallow ? NO_ERRORS_SCHEMA : options.schemas || []];

  return moduleMetadata;
}
