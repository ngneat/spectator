/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { Type } from '@angular/core';
import { SpectatorWithHost as BaseSpectatorWithHost, createHostComponentFactory as baseCreateHostComponentFactory, HostComponent, SpectatorOptions, isType, Token } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export class SpectatorWithHost<C, H = HostComponent> extends BaseSpectatorWithHost<C, H> {
  /**
   * @inheritDoc
   */
  get<T>(type: Token<T>, fromComponentInjector = false): T & SpyObject<T> {
    return super.get(type, fromComponentInjector) as T & SpyObject<T>;
  }
}

export function createHostComponentFactory<C, H = HostComponent>(options: SpectatorOptions<C, H> | Type<C>): (template: string, detectChanges?: boolean, complexInputs?: Partial<C>) => SpectatorWithHost<C, H> {
  if (!isType(options)) {
    options.providers = options.providers || [];
    (options.mocks || []).forEach(type => options.providers.push(mockProvider(type)));
    options.mocks = [];
  }

  return baseCreateHostComponentFactory(options) as (template: string, detectChanges?: boolean, complexInputs?: Partial<C>) => SpectatorWithHost<C, H>;
}
