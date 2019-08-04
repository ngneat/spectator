/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { Spectator as BaseSpectator, Token } from '@netbasal/spectator';

import { SpyObject } from './mock';

export class Spectator<C> extends BaseSpectator<C> {
  /**
   * @inheritDoc
   */
  get<T>(type: Token<T> | Token<any>, fromComponentInjector = false): T & SpyObject<T> {
    return super.get(type, fromComponentInjector) as T & SpyObject<T>;
  }
}
