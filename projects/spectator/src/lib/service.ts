/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { Provider, Type } from '@angular/core';
import { mockProvider, SpyObject } from './mock';
import { isType } from './is-type';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export interface SpectatorService<S> {
  service: S;

  get<T>(token: any): T & SpyObject<T>;
}

export type ServiceParams<S> = TestModuleMetadata & {
  service?: Type<S>;
  mocks?: Type<any>[];
  entryComponents?: any[];
};

export function createService<S>(options: ServiceParams<S> | Type<S>): SpectatorService<S> {
  const service = isType(options) ? options : options.service;

  const module: ServiceParams<S> = {
    providers: [service]
  };

  if (!isType(options)) {
    (options.mocks || []).forEach(type => module.providers.push(mockProvider(type)));
    module.providers = [...module.providers, ...(options.providers || [])];
    module.declarations = options.declarations || [];
    module.imports = options.imports || [];

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: options.entryComponents || []
      }
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule(module);
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
