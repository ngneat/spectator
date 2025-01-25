import { initialModule, ModuleMetadata } from '../base/initial-module';
import { FullInjectionContextOptions } from './options';

/**
 * @internal
 */
export function initialInjectionContextModule<F>(options: FullInjectionContextOptions): ModuleMetadata {
  const moduleMetadata = initialModule(options);

  return moduleMetadata;
}
