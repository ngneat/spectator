/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { TestBed } from '@angular/core/testing';
import { Provider, Type } from '@angular/core';
import { mockProvider, SpyObject } from './mock';

export interface SpectatorService<S> {
  service: S;

  get<T>(provider: Provider): T & SpyObject<T>;
}

export type Params<S> = {
  service?: Type<S>;
  mocks?: Type<any>[];
  providers?: Provider[];
  imports?: any[];
};

export function createService<S>(options: Type<S>): SpectatorService<S>;
export function createService<S>(options: Params<S>): SpectatorService<S>;
export function createService<S>(options: Params<S> | Type<S>): SpectatorService<S> {
  const service = typeof options === 'function' ? options : options.service;

  let module: Partial<Params<S>> = {
    providers: [service],
    imports: []
  };

  if (typeof options !== 'function') {
    (options.mocks || []).forEach(type => module.providers.push(mockProvider(type)));
    (options.providers || []).forEach(type => module.providers.push(type));
    module.imports.concat(options.imports || []);
  }

  beforeEach(() => {
    TestBed.configureTestingModule(module);
  });

  return {
    get service(): S {
      return TestBed.get(service);
    },
    get<T>(provider: Provider): T & SpyObject<T> {
      return TestBed.get(provider);
    }
  };
}
