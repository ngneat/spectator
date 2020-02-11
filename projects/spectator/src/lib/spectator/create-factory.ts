import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { BaseSpectatorOverrides } from '../base/options';
import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { isType } from '../types';

import { initialSpectatorModule } from './initial-module';
import { getSpectatorDefaultOptions, SpectatorOptions } from './options';
import { Spectator } from './spectator';

/**
 * @publicApi
 */
export type SpectatorFactory<C> = (options?: SpectatorOverrides<C>) => Spectator<C>;

/**
 * @publicApi
 */
export interface SpectatorOverrides<C> extends BaseSpectatorOverrides {
  detectChanges?: boolean;
  props?: Partial<C>;
}

/**
 * @deprecated Use createComponentFactory instead. To be removed in v5.
 */
export function createTestComponentFactory<C>(typeOrOptions: SpectatorOptions<C> | Type<C>): SpectatorFactory<C> {
  return createComponentFactory<C>(typeOrOptions);
}

/**
 * @publicApi
 */
export function createComponentFactory<C>(typeOrOptions: Type<C> | SpectatorOptions<C>): SpectatorFactory<C> {
  const options = isType(typeOrOptions)
    ? getSpectatorDefaultOptions<C>({ component: typeOrOptions })
    : getSpectatorDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorModule<C>(options);

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: moduleMetadata.entryComponents
      }
    });

    if (
      options.componentProviders.length ||
      options.componentMocks.length ||
      options.componentViewProviders.length ||
      options.componentViewMocks.length
    ) {
      TestBed.overrideComponent(options.component, {
        set: {
          providers: [...options.componentProviders, ...options.componentMocks.map(p => options.mockProvider(p))],
          viewProviders: [...options.componentViewProviders, ...options.componentViewMocks.map(p => options.mockProvider(p))]
        }
      });
    }

    TestBed.compileComponents();
  }));

  return (overrides?: SpectatorOverrides<C>) => {
    const defaults: SpectatorOverrides<C> = { props: {}, detectChanges: true, providers: [] };
    const { detectChanges, props, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    const spectator = createSpectator(options, props);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectator<C>(options: Required<SpectatorOptions<C>>, props?: Partial<C>): Spectator<C> {
  const fixture = TestBed.createComponent(options.component);
  const debugElement = fixture.debugElement;

  const component = setProps(fixture.componentInstance, props);

  return new Spectator(fixture, debugElement, component, debugElement.nativeElement);
}
