import { NO_ERRORS_SCHEMA } from '@angular/core';

import { initialModule, ModuleMetadata } from '../base/initial-module';

import { HostComponent } from './host-component';
import { SpectatorOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorModule<C, H = HostComponent>(options: Required<SpectatorOptions<C, H>>): ModuleMetadata {
  const moduleMetadata = initialModule(options);
  const { component, host } = options;

  if (options.declareComponent) {
    moduleMetadata.declarations.push(component);
  }

  moduleMetadata.schemas = [options.shallow ? NO_ERRORS_SCHEMA : options.schemas || []];
  moduleMetadata.declarations.push(host);

  return moduleMetadata;
}
