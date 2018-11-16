/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { InjectionToken, Type } from '@angular/core';
import { Spectator as BaseSpectator } from '@netbasal/spectator';

import { SpyObject } from './mock';

export class Spectator<C> extends BaseSpectator<C> {
  /**
   * @inheritDoc
   */
  get<T>(type: Type<T> | InjectionToken<T>, fromComponentInjector = false): T & SpyObject<T> {
    return super.get(type, fromComponentInjector) as T & SpyObject<T>;
  }
}
