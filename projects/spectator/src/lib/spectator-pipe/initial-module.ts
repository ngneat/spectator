import { initialModule, ModuleMetadata } from '../base/initial-module';
import { declareInModule } from '../utils';

import { SpectatorPipeOptions } from './options';

/**
 * @internal
 */
export function initialSpectatorPipeModule<D, H>(options: Required<SpectatorPipeOptions<D, H>>): ModuleMetadata {
  const moduleMetadata = initialModule(options);

  declareInModule(moduleMetadata, options.pipe);
  moduleMetadata.declarations.push(options.host);

  return moduleMetadata;
}
