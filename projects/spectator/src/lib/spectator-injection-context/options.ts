import { BaseSpectatorOptions, getDefaultBaseOptions } from '../base/options';
import { merge } from '../internals/merge';
import { AtLeastOneRequired, OptionalsRequired } from '../types';

export type SpectatorInjectionContextOptions = AtLeastOneRequired<
  Pick<BaseSpectatorOptions, 'imports' | 'mockProvider' | 'mocks' | 'providers'>
>;

const defaultFunctionOptions: OptionalsRequired<SpectatorInjectionContextOptions> = {
  ...getDefaultBaseOptions(),
};

/**
 * @internal
 */
export type FullInjectionContextOptions = Required<SpectatorInjectionContextOptions> & Required<BaseSpectatorOptions>;

/**
 * @internal
 */
export function getDefaultFunctionOptions(overrides: SpectatorInjectionContextOptions): FullInjectionContextOptions {
  return merge(defaultFunctionOptions, overrides) as FullInjectionContextOptions;
}
