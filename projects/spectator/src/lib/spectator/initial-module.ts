import { NO_ERRORS_SCHEMA } from '@angular/core';

import { initialModule, ModuleMetadata } from '../base/initial-module';

import { SpectatorOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorModule<C>(options: Required<SpectatorOptions<C>>): ModuleMetadata {
  const moduleMetadata = initialModule(options);

  if (options.declareComponent) {
    moduleMetadata.declarations.push(options.component);
  }

  moduleMetadata.schemas = [options.shallow ? NO_ERRORS_SCHEMA : options.schemas || []];

  return moduleMetadata;
}
