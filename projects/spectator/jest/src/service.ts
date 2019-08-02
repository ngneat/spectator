/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { Type } from '@angular/core';
import { SpectatorService as BaseSpectatorService, createService as baseCreateService, isType, ServiceParams, Token } from '@netbasal/spectator';

import { mockProvider, SpyObject } from './mock';

export interface SpectatorService<S> extends BaseSpectatorService<S> {
  get<T>(token: Token<T> | Token<any>): T & SpyObject<T>;
}

export function createService<S>(options: ServiceParams<S> | Type<S>): SpectatorService<S> {
  if (!isType(options)) {
    options.providers = options.providers || [];
    (options.mocks || []).forEach(type => options.providers.push(mockProvider(type)));
    options.mocks = [];
    options.declarations = options.declarations || [];
    options.entryComponents = options.entryComponents || [];
  }

  return baseCreateService(options) as SpectatorService<S>;
}
