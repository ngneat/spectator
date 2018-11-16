/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { Type } from '@angular/core';
import { HostComponent, initialModule as baseInitialModule, SpectatorOptions, isType } from '@netbasal/spectator';

import { mockProvider } from './mock';

export function initialModule<T, C = HostComponent>(options: SpectatorOptions<T, C> | Type<T>, withHost = false) {
  if (!isType(options)) {
    (options.mocks || []).forEach(type => options.providers.push(mockProvider(type)));
    options.mocks = [];
  }

  return baseInitialModule(options, withHost);
}
