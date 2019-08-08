import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';
import { MockProvider, mockProvider, SpyObject } from './mock';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Token } from './token';
import { isType } from './types';

export interface SpectatorService<S> {
  service: S;

  get<T>(token: Token<T> | Token<any>): SpyObject<T>;
}

export type ServiceOptions<S> = TestModuleMetadata & {
  service?: Type<S>;
  mocks?: Type<any>[];
  mockProvider?: MockProvider;
  entryComponents?: any[];
};

const defaultOptions: ServiceOptions<any> = {
  mockProvider: mockProvider
};

export function createService<Service>(typeOrOptions: ServiceOptions<Service> | Type<Service>): SpectatorService<Service> {
  const service = isType(typeOrOptions) ? typeOrOptions : typeOrOptions.service;

  const module: ServiceOptions<Service> = {
    providers: [service]
  };

  if (!isType(typeOrOptions)) {
    const merged = Object.assign({}, defaultOptions, typeOrOptions);

    (typeOrOptions.mocks || []).forEach(type => module.providers.push(typeOrOptions.mockProvider(type)));
    module.providers = [...module.providers, ...(typeOrOptions.providers || [])];
    module.declarations = typeOrOptions.declarations || [];
    module.imports = typeOrOptions.imports || [];

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: typeOrOptions.entryComponents || []
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
    get<T>(token: Token<T>): SpyObject<T> {
      return TestBed.get(token);
    }
  };
}
