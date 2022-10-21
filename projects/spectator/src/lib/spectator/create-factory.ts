import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { BaseSpectatorOptions, BaseSpectatorOverrides } from '../base/options';
import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { addMatchers } from '../core';
import { isType } from '../types';
import { ModuleMetadata } from '../base/initial-module';

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
 * @internal
 */
export function overrideComponentIfProviderOverridesSpecified<C>(options: Required<SpectatorOptions<C>>): void {
  const hasProviderOverrides = options.componentProviders.length || options.componentMocks.length;
  const hasViewProviders = options.componentViewProviders.length || options.componentViewProvidersMocks.length;
  if (hasProviderOverrides || hasViewProviders) {
    let providerConfiguration = {};
    if (hasProviderOverrides) {
      providerConfiguration = {
        providers: [...options.componentProviders, ...options.componentMocks.map(p => options.mockProvider(p))]
      };
    }
    if (hasViewProviders) {
      providerConfiguration = {
        ...providerConfiguration,
        viewProviders: [...options.componentViewProviders, ...options.componentViewProvidersMocks.map(p => options.mockProvider(p))]
      };
    }
    TestBed.overrideComponent(options.component, {
      set: providerConfiguration
    });
  }
}

/**
 * @internal
 */
export function overrideModules(options: Required<BaseSpectatorOptions>): void {
  if (options.overrideModules.length) {
    options.overrideModules.forEach(overrideModule => {
      const [ngModule, override] = overrideModule;

      TestBed.overrideModule(ngModule, override);
    });
  }
}

/**
 * @publicApi
 */
export function createComponentFactory<C>(typeOrOptions: Type<C> | SpectatorOptions<C>): SpectatorFactory<C> {
  const options = isType(typeOrOptions)
    ? getSpectatorDefaultOptions<C>({ component: typeOrOptions })
    : getSpectatorDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorModule<C>(options);

  beforeEach(waitForAsync(() => {
    configureAndCompileTestingModule(moduleMetadata, options);
  }));

  return (overrides?: SpectatorOverrides<C>) => {
    const defaults: SpectatorOverrides<C> = { props: {}, detectChanges: true, providers: [] };
    const { detectChanges, props, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      TestBed.resetTestingModule();
      initializeTestingModule({
        ...options,
        providers
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

function initializeTestingModule<C>(typeOrOptions: Type<C> | SpectatorOptions<C>): void {
  const options = isType(typeOrOptions)
    ? getSpectatorDefaultOptions<C>({ component: typeOrOptions })
    : getSpectatorDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorModule<C>(options);

  configureAndCompileTestingModule(moduleMetadata, options);
}

function configureAndCompileTestingModule<C>(moduleMetadata: ModuleMetadata, options: Required<SpectatorOptions<C>>): void {
  addMatchers(customMatchers);
  TestBed.configureTestingModule(moduleMetadata).overrideModule(BrowserDynamicTestingModule, {
    set: {
      entryComponents: moduleMetadata.entryComponents
    }
  });

  overrideModules(options);

  overrideComponentIfProviderOverridesSpecified(options);

  TestBed.compileComponents();
}
