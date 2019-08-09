import { initialModule, ModuleMetadata } from '../base/initial-module';

import { SpectatorServiceOptions } from './options';

/**
 * @internal
 */
export function initialServiceModule<S>(options: Required<SpectatorServiceOptions<S>>): ModuleMetadata {
  const moduleMetadata = initialModule(options);

  moduleMetadata.providers.push(options.service);

  return moduleMetadata;
}
