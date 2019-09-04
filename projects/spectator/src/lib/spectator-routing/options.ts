import { merge } from '../internals/merge';
import { getSpectatorDefaultOptions, SpectatorOptions } from '../spectator/options';
import { OptionalsRequired } from '../types';

import { RouteOptions } from './route-options';

export type SpectatorRoutingOptions<C> = SpectatorOptions<C> &
  RouteOptions & {
    mockRouterLinks?: boolean;
  };

const defaultRoutingOptions: OptionalsRequired<SpectatorRoutingOptions<any>> = {
  ...getSpectatorDefaultOptions(),
  params: {},
  queryParams: {},
  data: {},
  fragment: null,
  mockRouterLinks: true
};

/**
 * @internal
 */
export function getRoutingDefaultOptions<S>(overrides: SpectatorRoutingOptions<S>): Required<SpectatorRoutingOptions<S>> {
  return merge(defaultRoutingOptions, overrides);
}
