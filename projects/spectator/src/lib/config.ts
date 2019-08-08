import { TestModuleMetadata } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockProvider, MockProvider } from './mock';
import { getGlobalsInjections } from './globals-injections';
import { isType } from './types';

@Component({
  template: ''
})
export class HostComponent {}

export type SpectatorOptions<T = any, H = HostComponent> = TestModuleMetadata & {
  component?: Type<T>;
  shallow?: boolean;
  disableAnimations?: boolean;
  host?: Type<H>;
  entryComponents?: any[];
  componentProviders?: any[];
  mocks?: Type<any>[];
  mockProvider?: MockProvider;
  detectChanges?: boolean;
  declareComponent?: boolean;
};

const defaultOptions: SpectatorOptions<any, HostComponent> = {
  disableAnimations: true,
  shallow: false,
  host: HostComponent,
  entryComponents: [],
  mockProvider: mockProvider,
  mocks: [],
  declareComponent: true
};

export function initialModule<Component, Host = HostComponent>(
  typeOrOptions: SpectatorOptions<Component, Host> | Type<Component>,
  withHost = false
): {
  moduleMetadata: TestModuleMetadata & SpectatorOptions<Component, Host>;
  component: Type<Component>;
  host: Type<Host>;
} {
  const { declarations: globalDec, providers: globalProviders, imports: globalImports } = getGlobalsInjections();
  const merged = Object.assign({}, defaultOptions, typeOrOptions);
  let moduleMetadata: TestModuleMetadata & Partial<SpectatorOptions<Component, Host>>;
  let component;
  let host;

  if (isType(typeOrOptions)) {
    component = typeOrOptions;
    host = HostComponent;
    moduleMetadata = {
      declarations: [...globalDec, component, withHost ? host : []],
      imports: [...globalImports, NoopAnimationsModule],
      schemas: [],
      providers: [...globalProviders],
      componentProviders: [],
      entryComponents: []
    };
  } else {
    component = merged.component;
    host = merged.host;

    moduleMetadata = {
      declarations: [...globalDec, merged.declareComponent ? component : [], withHost ? host : [], ...(merged.declarations || [])],
      imports: [...globalImports, merged.disableAnimations ? NoopAnimationsModule : [], ...(merged.imports || [])],
      schemas: [merged.shallow ? NO_ERRORS_SCHEMA : merged.schemas || []],
      providers: [...globalProviders, ...(merged.providers || [])],
      componentProviders: merged.componentProviders ? [merged.componentProviders] : [],
      entryComponents: [merged.entryComponents]
    };

    (merged.mocks || []).forEach(type => moduleMetadata.providers.push(merged.mockProvider(type)));
  }

  return {
    moduleMetadata,
    component,
    host
  };
}
