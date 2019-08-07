import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';
import { mockProvider, SpyObject } from './mock';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Token } from './token';
import { isType } from './types';

export interface SpectatorService<S> {
  service: S;

  get<T>(token: Token<T> | Token<any>): T & SpyObject<T>;
}

export type ServiceParams<S> = TestModuleMetadata & {
  service?: Type<S>;
  mocks?: Type<any>[];
  entryComponents?: any[];
};

export function createService<Service>(options: ServiceParams<Service> | Type<Service>): SpectatorService<Service> {
  const service = isType(options) ? options : options.service;

  const module: ServiceParams<Service> = {
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
    const eagerInit = TestBed.get(service);
  });

  return {
    get service(): Service {
      return TestBed.get(service);
    },
    get<T>(token: Token<T> | Token<any>): T & SpyObject<T> {
      return TestBed.get(token);
    }
  };
}
