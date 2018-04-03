/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spectator } from './internals';
import * as customMatchers from './matchers';
import { By } from '@angular/platform-browser';
import { HostComponent, initialModule, SpectatorOptions } from './config';

export class SpectatorWithHost<C, H = HostComponent> extends Spectator<C> {
  hostComponent: H;
  /** We need a different property when there is an host because it's different type */
  hostFixture: ComponentFixture<H>;
  hostElement: HTMLElement;
  hostDebugElement: DebugElement;

  /**
   *
   * @param {Type<any>} directive
   * @returns {DebugElement}
   */
  byDirective<T>(directive: Type<any>): DebugElement {
    return this.hostDebugElement.query(By.directive(directive));
  }
}

export function createHostComponentFactory<T, H>(component: Type<T>): (template: string, detectChanges?: boolean) => SpectatorWithHost<T, H>;
export function createHostComponentFactory<T, H>(options: SpectatorOptions<T, H>): (template: string, detectChanges?: boolean) => SpectatorWithHost<T, H>;
export function createHostComponentFactory<T, H = HostComponent>(options: SpectatorOptions<T, H> | Type<T>): (template: string, detectChanges?: boolean) => SpectatorWithHost<T, H> {
  const { component, moduleMetadata, host } = initialModule<T>(options, true);

  beforeEach(() => {
    jasmine.addMatchers(customMatchers as any);
  });

  beforeEach(() => {
    TestBed.configureTestingModule(moduleMetadata);
  });

  return (template: string, detectChanges = true) => {
    TestBed.overrideComponent(host, { set: { template: template } });
    const spectatorWithHost = new SpectatorWithHost<T, H>();
    spectatorWithHost.hostFixture = TestBed.createComponent(host);

    if (detectChanges) {
      spectatorWithHost.hostFixture.detectChanges();
    }

    //  The host component instance
    spectatorWithHost.hostComponent = spectatorWithHost.hostFixture.componentInstance;
    spectatorWithHost.hostDebugElement = spectatorWithHost.hostFixture.debugElement;
    spectatorWithHost.hostElement = spectatorWithHost.hostFixture.nativeElement;
    // The tested component debug element
    spectatorWithHost.debugElement = spectatorWithHost.hostFixture.debugElement.query(By.directive(component));
    // The tested component instance, rendered inside the host
    spectatorWithHost.component = spectatorWithHost.debugElement.componentInstance;
    spectatorWithHost.element = spectatorWithHost.debugElement.nativeElement;

    return spectatorWithHost;
  };
}
