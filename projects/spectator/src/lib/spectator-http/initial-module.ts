import { HttpClientTestingModule } from '@angular/common/http/testing';

import { initialModule, ModuleMetadata } from '../base/initial-module';

import { SpectatorHttpOptions } from './options';

/**
 * @internal
 */
export function initialHttpModule<S>(options: Required<SpectatorHttpOptions<S>>): ModuleMetadata {
  const moduleMetadata = initialModule(options);

  moduleMetadata.providers.push(options.service);
  moduleMetadata.imports.push(HttpClientTestingModule);

  return moduleMetadata;
}
