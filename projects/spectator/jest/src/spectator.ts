/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { createTestComponentFactory as baseCreateTestComponentFactory, SpectatorOptions, isType } from '@netbasal/spectator';
import { mockProvider } from './mock';
import { Type } from '@angular/core';
import { Spectator } from './internals';

/**
 * Create factory-function for tested component
 * @param component - testedType
 * @param shallow - use NO_ERRORS_SCHEMA
 * @param moduleMetadata
 */
export function createTestComponentFactory<T>(options: SpectatorOptions<T> | Type<T>): (componentParameters?: Partial<T>, detectChanges?: boolean) => Spectator<T> {
  if (!isType(options)) {
    options.providers = options.providers || [];
    (options.mocks || []).forEach(type => options.providers.push(mockProvider(type)));
    options.mocks = [];
  }

  return baseCreateTestComponentFactory(options) as (componentParameters?: Partial<T>, detectChanges?: boolean) => Spectator<T>;
}
