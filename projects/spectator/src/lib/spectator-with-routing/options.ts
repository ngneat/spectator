import { merge } from '../internals/merge';
import { getSpectatorDefaultOptions, SpectatorOptions } from '../spectator/options';
import { OptionalsRequired } from '../types';

import { RouteOptions } from './route-options';

export type SpectatorWithRoutingOptions<C> = SpectatorOptions<C> &
  RouteOptions & {
    mockRouterLinks?: boolean;
  };

const defaultRoutingOptions: OptionalsRequired<SpectatorWithRoutingOptions<unknown>> = {
  ...getSpectatorDefaultOptions<unknown>(),
  params: {},
  queryParams: {},
  data: {},
  mockRouterLinks: true
};

/**
 * @internal
 */
export function getRoutingDefaultOptions<S>(overrides: SpectatorWithRoutingOptions<S>): Required<SpectatorWithRoutingOptions<S>> {
  return merge(defaultRoutingOptions, overrides) as Required<SpectatorWithRoutingOptions<S>>;
}
