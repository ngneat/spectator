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
import { isType } from './is-type';

export interface SpectatorService<S> {
  service: S;

  get<T>(token: any): T & SpyObject<T>;
}

export type Params<S> = {
  service?: Type<S>;
  mocks?: Type<any>[];
  providers?: Provider[];
  imports?: any[];
};

export function createService<S>(options: Params<S> | Type<S>): SpectatorService<S> {
  const service = isType(options) ? options : options.service;

  const module: Params<S> = {
    providers: [service],
    imports: []
  };

  if (!isType(options)) {
    (options.mocks || []).forEach(type => module.providers.push(mockProvider(type)));
    (options.providers || []).forEach(type => module.providers.push(type));
    module.imports = module.imports.concat(options.imports || []);
  }

  beforeEach(() => {
    TestBed.configureTestingModule(module);
  });

  afterEach(() => {
    const testedService = TestBed.get(service);
    if (typeof testedService.ngOnDestroy === 'function') {
      testedService.ngOnDestroy();
    }
  });

  return {
    get service(): S {
      return TestBed.get(service);
    },
    get<T>(token: any): T & SpyObject<T> {
      return TestBed.get(token);
    }
  };
}
