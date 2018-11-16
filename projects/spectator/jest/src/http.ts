/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { Type } from '@angular/core';
import { SpectatorHTTP as BaseSpectatorHTTP, createHTTPFactory as baseCreateHTTPFactory } from '@netbasal/spectator';

import { SpyObject } from './mock';

export class SpectatorHTTP<T> extends BaseSpectatorHTTP<T> {
  get: <S>(service: Type<S>) => S & SpyObject<S>;
}

export function createHTTPFactory<T>(dataService: Type<T>, providers = []) {
  return baseCreateHTTPFactory(dataService, providers) as () => SpectatorHTTP<T>;
}
