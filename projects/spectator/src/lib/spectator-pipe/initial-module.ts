import { initialModule, ModuleMetadata } from '../base/initial-module';

import { SpectatorPipeOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorPipeModule<D, H>(options: Required<SpectatorPipeOptions<D, H>>): ModuleMetadata {
  const moduleMetadata = initialModule(options);

  moduleMetadata.declarations.push(options.pipe);
  moduleMetadata.declarations.push(options.host);

  return moduleMetadata;
}
