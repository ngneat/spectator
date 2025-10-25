import { Component, isStandalone, Provider, reflectComponentType, Type } from '@angular/core';
import { MetadataOverride, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { BaseSpectatorOptions, BaseSpectatorOverrides } from '../base/options';
import { addMatchers } from '../core';
import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { InferInputSignals, isType } from '../types';

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
  props?: InferInputSignals<C>;
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
        providers: [...options.componentProviders, ...options.componentMocks.map((p) => options.mockProvider(p))],
      };
    }
    if (hasViewProviders) {
      providerConfiguration = {
        ...providerConfiguration,
        viewProviders: [...options.componentViewProviders, ...options.componentViewProvidersMocks.map((p) => options.mockProvider(p))],
      };
    }
    TestBed.overrideComponent(options.component, {
      set: providerConfiguration,
    });
  }
}

/**
 * @internal
 */
export function overrideComponentImports<C>(options: Required<SpectatorOptions<C>>): void {
  if (!options.componentImports.length) {
    return;
  }

  TestBed.overrideComponent(
    options.component,
    options.componentImports.reduce<MetadataOverride<Component>>(
      (r, [original, override]) => {
        r.remove!.imports!.push(original);

        if (override) {
          r.add!.imports!.push(override);
        }

        return r;
      },
      { remove: { imports: [] }, add: { imports: [] } },
    ),
  );
}

/**
 * @internal
 */
export function overrideModules(options: Required<BaseSpectatorOptions>): void {
  if (options.overrideModules.length) {
    options.overrideModules.forEach((overrideModule) => {
      const [ngModule, override] = overrideModule;

      TestBed.overrideModule(ngModule, override);
    });
  }
}

/**
 * @internal
 */
export function overrideComponents(options: Required<BaseSpectatorOptions>): void {
  if (options.overrideComponents.length) {
    options.overrideComponents.forEach((overrideComponent) => {
      const [component, override] = overrideComponent;

      if (!reflectComponentType(component)?.isStandalone) {
        throw new Error(`Can not override non standalone component`);
      }

      TestBed.overrideComponent(component, override);
    });
  }
}

/**
 * @internal
 */
export function overrideDirectives(options: Required<BaseSpectatorOptions>): void {
  if (options.overrideDirectives.length) {
    options.overrideDirectives.forEach((overrideDirective) => {
      const [directive, override] = overrideDirective;

      if (!isStandalone(directive)) {
        throw new Error(`Can not override non standalone directive`);
      }

      TestBed.overrideDirective(directive, override);
    });
  }
}

/**
 * @internal
 */
export function overridePipes(options: Required<BaseSpectatorOptions>): void {
  if (options.overridePipes.length) {
    options.overridePipes.forEach((overridePipe) => {
      const [pipe, override] = overridePipe;

      if (!isStandalone(pipe)) {
        throw new Error(`Can not override non standalone pipe`);
      }

      TestBed.overridePipe(pipe, override);
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

  beforeEach(() => {
    addMatchers(customMatchers);
    TestBed.configureTestingModule(moduleMetadata).overrideModule(BrowserDynamicTestingModule, {});

    overrideModules(options);
    overrideComponents(options);
    overrideDirectives(options);
    overridePipes(options);

    overrideComponentIfProviderOverridesSpecified(options);
    overrideComponentImports(options);
  });

  return (overrides?: SpectatorOverrides<C>) => {
    const defaults: SpectatorOverrides<C> = { props: {}, detectChanges: true, providers: [] };
    const { detectChanges, props, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        const token = (provider as any).provide;
        if (token) {
          TestBed.overrideProvider(token, provider as any);
        }
      });
    }

    const spectator = createSpectator(options, props);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectator<C>(options: Required<SpectatorOptions<C>>, props?: InferInputSignals<C>): Spectator<C> {
  const fixture = TestBed.createComponent(options.component, { bindings: options.bindings });
  const debugElement = fixture.debugElement;

  const component = setProps(fixture.componentRef, props);

  return new Spectator(fixture, debugElement, component, debugElement.nativeElement);
}
