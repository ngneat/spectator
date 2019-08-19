import { NO_ERRORS_SCHEMA } from '@angular/core';

import { initialModule, ModuleMetadata } from '../base/initial-module';
import { HostComponent } from '../spectator-with-host/host-component';

import { SpectatorForDirectiveOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorForDirectiveModule<D, H = HostComponent>(
  options: Required<SpectatorForDirectiveOptions<D>>
): ModuleMetadata {
  const moduleMetadata = initialModule(options);

  moduleMetadata.declarations.push(options.directive);
  moduleMetadata.declarations.push(options.host);

  moduleMetadata.schemas = [options.shallow ? NO_ERRORS_SCHEMA : options.schemas || []];

  return moduleMetadata;
}
