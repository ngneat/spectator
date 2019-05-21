/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { TestModuleMetadata } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, Type } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockProvider } from './mock';
import { isType } from './is-type';
import { getGlobalsInjections } from './globals-injections';

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
  detectChanges?: boolean;
  declareComponent?: boolean;
};

const defaultOptions: SpectatorOptions<any, any> = {
  disableAnimations: true,
  shallow: false,
  host: HostComponent,
  entryComponents: [],
  mocks: [],
  declareComponent: true
};

const { declarations: globalDec, providers: globalProviders, imports: globalImports } = getGlobalsInjections();

export function initialModule<T, C = HostComponent>(
  options: SpectatorOptions<T, C> | Type<T>,
  withHost = false
): {
  moduleMetadata: TestModuleMetadata & SpectatorOptions<T, C>;
  component: Type<T>;
  host: Type<C>;
} {
  const merged = Object.assign({}, defaultOptions, options);
  let moduleMetadata: TestModuleMetadata & Partial<SpectatorOptions<T, C>>;
  let component;
  let host;

  if (isType(options)) {
    component = options;
    host = HostComponent;
    moduleMetadata = {
      declarations: [...globalDec, component, withHost ? host : []],
      imports: [...globalImports, NoopAnimationsModule],
      schemas: [],
      providers: [...globalProviders],
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
      componentProviders: merged.componentProviders ? [merged.componentProviders] : undefined,
      entryComponents: [merged.entryComponents]
    };

    (merged.mocks || []).forEach(type => moduleMetadata.providers.push(mockProvider(type)));
  }

  return {
    moduleMetadata,
    component,
    host
  };
}
