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

@Component({
  template: ''
})
export class HostComponent {}

export type SpectatorOptions<T = any, H = HostComponent> = TestModuleMetadata & {
  component?: Type<T>;
  shallow?: boolean;
  disableAnimations?: boolean;
  host: Type<H>;
};

const defaultOptions: SpectatorOptions<any, any> = {
  disableAnimations: true,
  shallow: false,
  host: HostComponent
};

export function initialModule<T, C = HostComponent>(options: SpectatorOptions<T, C> | Type<T>, withHost = false) {
  Object.assign(defaultOptions, options);
  let moduleMetadata: TestModuleMetadata;
  let component;
  let host;

  if (typeof options === 'function') {
    component = options;
    host = HostComponent;
    moduleMetadata = {
      declarations: [component, withHost ? host : []],
      imports: [NoopAnimationsModule],
      schemas: [],
      providers: []
    };
  } else {
    component = options.component;
    host = options.host;

    moduleMetadata = {
      declarations: [component, withHost ? options.host : [], ...(options.declarations || [])],
      imports: [options.disableAnimations ? NoopAnimationsModule : [], ...(options.imports || [])],
      schemas: [options.shallow ? NO_ERRORS_SCHEMA : []],
      providers: [...(options.providers || [])]
    };
  }

  return {
    moduleMetadata,
    component,
    host
  };
}
