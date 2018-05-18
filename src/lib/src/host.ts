/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { _getChild, _getChildren, _setInput, Spectator } from './internals';
import * as customMatchers from './matchers';
import { By } from '@angular/platform-browser';
import { HostComponent, initialModule, SpectatorOptions } from './config';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

export class SpectatorWithHost<C, H = HostComponent> extends Spectator<C> {
  hostComponent: H;
  /** We need a different property when there is an host because it's different type */
  hostFixture: ComponentFixture<H>;
  hostElement: HTMLElement;
  hostDebugElement: DebugElement;

  /**
   *
   * @param {Type<T> | string} directiveOrSelector
   * @param {{read}} options
   * @returns {T}
   */
  queryHost<T>(directiveOrSelector: string, options?: { read }): Element;
  queryHost<T>(directiveOrSelector: Type<T>, options?: { read }): T;
  queryHost<T>(directiveOrSelector: Type<T> | string, options: { read } = { read: undefined }): T {
    return _getChild(this.hostDebugElement, this.hostElement)(directiveOrSelector, options);
  }

  /**
   *
   * @param {Type<T> | string} directiveOrSelector
   * @param {{read}} options
   * @returns {T[]}
   */
  queryHostAll<T>(directiveOrSelector: string, options?: { read }): Element[];
  queryHostAll<T>(directiveOrSelector: Type<T>, options?: { read }): T[];
  queryHostAll<T>(directiveOrSelector: Type<T> | string, options: { read } = { read: undefined }): T[] {
    return _getChildren(this.hostDebugElement, this.hostElement)(directiveOrSelector, options);
  }

  setHostInput<K extends keyof H>(input: Partial<H>);
  setHostInput<K extends keyof H>(input: K, inputValue: H[K]);
  setHostInput<K extends keyof H>(input: Partial<H> | K, inputValue?: H[K]) {
    _setInput(input, inputValue, this.hostComponent);
    this.hostFixture.detectChanges();
  }
}

export function createHostComponentFactory<C, H = HostComponent>(component: Type<C>): (template: string, detectChanges?: boolean, complexInputs?: Partial<C>) => SpectatorWithHost<C, H>;
export function createHostComponentFactory<C, H = HostComponent>(options: SpectatorOptions<C, H>): (template: string, detectChanges?: boolean, complexInputs?: Partial<C>) => SpectatorWithHost<C, H>;
export function createHostComponentFactory<C, H = HostComponent>(options: SpectatorOptions<C, H> | Type<C>): (template: string, detectChanges?: boolean, complexInputs?: Partial<C>) => SpectatorWithHost<C, H> {
  const { component, moduleMetadata, host } = initialModule<C>(options, true);

  beforeEach(() => {
    jasmine.addMatchers(customMatchers as any);
  });

  beforeEach(() => {
    TestBed.configureTestingModule(moduleMetadata);
  });

  return (template: string, detectChanges = true, initialInputs?: Partial<C>) => {
    TestBed.overrideComponent(host, { set: { template: template } });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: moduleMetadata.entryComponents
      }
    });
    const spectatorWithHost = new SpectatorWithHost<C, H>();
    spectatorWithHost.hostFixture = TestBed.createComponent(host);
    //  The host component instance
    spectatorWithHost.hostComponent = spectatorWithHost.hostFixture.componentInstance;
    spectatorWithHost.hostDebugElement = spectatorWithHost.hostFixture.debugElement;
    spectatorWithHost.hostElement = spectatorWithHost.hostFixture.nativeElement;
    // The tested component debug element
    spectatorWithHost.debugElement = spectatorWithHost.hostFixture.debugElement.query(By.directive(component));
    // The tested component instance, rendered inside the host
    if (spectatorWithHost.debugElement) {
      spectatorWithHost.component = spectatorWithHost.debugElement.componentInstance;
      spectatorWithHost.element = spectatorWithHost.debugElement.nativeElement;
    }

    if (initialInputs) {
      spectatorWithHost.setInput(initialInputs);
    }

    if (detectChanges) {
      spectatorWithHost.hostFixture.detectChanges();
    }

    return spectatorWithHost;
  };
}
