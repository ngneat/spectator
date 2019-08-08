import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { BaseSpectatorOverrides } from '../base/options';
import * as customMatchers from '../matchers';
import { isType } from '../types';

import { initialSpectatorModule } from './initial-module';
import { getSpectatorDefaultOptions, SpectatorOptions } from './options';
import { Spectator } from './spectator';

interface HashMap<T = any> {
  [key: string]: T;
}

/**
 * @publicApi
 */
export type SpectatorFactory<Component> = (options?: SpectatorOverrides<Component>) => Spectator<Component>;

/**
 * @publicApi
 */
export interface SpectatorOverrides<Component> extends BaseSpectatorOverrides {
  detectChanges?: boolean;
  properties?: Partial<Component> & HashMap;
}

/**
 * @publicApi
 */
export function createTestComponentFactory<C>(typeOrOptions: Type<C> | SpectatorOptions<C>): SpectatorFactory<C> {
  const component = isType(typeOrOptions) ? typeOrOptions : typeOrOptions.component;
  const options = isType(typeOrOptions) ? getSpectatorDefaultOptions({ component }) : getSpectatorDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorModule<C>(options);
  const componentProviders = options.componentProviders;

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);

    if (componentProviders) {
      TestBed.overrideComponent(options.component, {
        set: {
          providers: componentProviders
        }
      });
    }

    TestBed.compileComponents();
  }));

  return (overrides?: SpectatorOverrides<C>) => {
    const defaults: SpectatorOverrides<C> = { properties: {}, detectChanges: true, providers: [] };
    const { detectChanges, properties, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    const spectator = new Spectator<C>();
    spectator.fixture = TestBed.createComponent(options.component);
    spectator.debugElement = spectator.fixture.debugElement;

    // The component instance
    spectator.component = spectator.debugElement.componentInstance;

    // The component native element
    spectator.element = spectator.debugElement.nativeElement;

    if (properties) {
      Object.keys(properties).forEach(input => {
        spectator.component[input] = properties[input];
      });
    }

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}
