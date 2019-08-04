/**
 * @license
 * Copyright Netanel Basal. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NetanelBasal/spectator/blob/master/LICENSE
 */

import { NgModule, Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import * as customMatchers from './matchers';
import { Spectator } from './internals';
import { initialModule, SpectatorOptions } from './config';
import { isType } from './is-type';

export interface Options {
  detectChanges?: boolean;
  providers?: Provider[];
}

type HashMap<T> = Partial<T> & { [key: string]: any };

/**
 * Create factory-function for tested component
 * @param typeOrOptions
 */
export function createTestComponentFactory<T>(typeOrOptions: SpectatorOptions<T> | Type<T>): (componentParameters?: HashMap<T> | Options, dcOrOptions?: boolean | Options) => Spectator<T> {
  const { component, moduleMetadata } = initialModule<T>(typeOrOptions);

  const dc = isType(typeOrOptions) || typeOrOptions.detectChanges === undefined ? true : typeOrOptions.detectChanges;

  beforeEach(() => {
    jasmine.addMatchers(customMatchers as any);
  });

  beforeEach(async(() => {
    @NgModule({
      entryComponents: [moduleMetadata.entryComponents ? moduleMetadata.entryComponents : []]
    })
    class EntryComponentModule {}

    moduleMetadata.imports = [moduleMetadata.imports ? moduleMetadata.imports : [], EntryComponentModule];
    TestBed.configureTestingModule(moduleMetadata)
      .overrideComponent(component, {
        set: {
          providers: moduleMetadata.componentProviders ? [moduleMetadata.componentProviders] : undefined
        }
      })
      .compileComponents();
  }));

  return (inputs: HashMap<T> = {}, dcOrOptions?: boolean | Options) => {
    const toObject: Options = {
      detectChanges: true,
      providers: typeof dcOrOptions === 'object' ? dcOrOptions.providers || [] : []
    };

    if (dcOrOptions === undefined) {
      toObject.detectChanges = true;
    } else if (typeof dcOrOptions === 'boolean') {
      toObject.detectChanges = dcOrOptions;
    } else {
      toObject.detectChanges = dcOrOptions.detectChanges === undefined ? true : !!dcOrOptions.detectChanges;
    }

    toObject.providers.forEach(provider => {
      TestBed.overrideProvider((provider as any).provide, provider as any);
    });

    const spectator = new Spectator<T>();
    spectator.fixture = TestBed.createComponent(component);
    spectator.debugElement = spectator.fixture.debugElement;
    // The component instance
    spectator.component = spectator.debugElement.componentInstance;
    // The component native element
    spectator.element = spectator.debugElement.nativeElement;

    Object.keys(inputs).forEach(input => {
      spectator.component[input] = inputs[input];
    });

    if (dc && toObject.detectChanges) {
      spectator.detectChanges();
    }
    return spectator;
  };
}
