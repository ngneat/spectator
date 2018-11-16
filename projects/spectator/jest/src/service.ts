/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { Type } from '@angular/core';
import { Params, SpectatorService as BaseSpectatorService, createService as baseCreateService } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export interface SpectatorService<S> extends BaseSpectatorService<S> {
  get<T>(token: any): T & SpyObject<T>;
}

export function createService<S>(options: Params<S> | Type<S>): SpectatorService<S> {
  if (typeof options !== 'function') {
    options.providers = options.providers || [];
    (options.mocks || []).forEach(type => options.providers.push(mockProvider(type)));
    options.mocks = [];
  }

  return baseCreateService(options) as SpectatorService<S>;
}
