import { Type } from '@angular/core';
import { createHostComponentFactory as baseCreateHostComponentFactory, HostComponent, SpectatorOptions, SpectatorWithHost as BaseSpectatorWithHost } from '@netbasal/spectator';
import { CreateComponentOptions } from '../../src/lib/types';

export class SpectatorWithHost<C, H = HostComponent> extends BaseSpectatorWithHost<C, H> {}

export function createHostComponentFactory<Component, Host = HostComponent>(options: SpectatorOptions<Component, Host> | Type<Component>): (template: string, options?: CreateComponentOptions<Component>) => SpectatorWithHost<Component, Host> {
  return baseCreateHostComponentFactory(options);
}
