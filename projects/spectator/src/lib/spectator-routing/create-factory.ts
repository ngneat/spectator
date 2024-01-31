import { NgZone, Provider, Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { addMatchers } from '../core';
import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import {
  overrideComponentIfProviderOverridesSpecified,
  overrideComponents,
  overrideDirectives,
  overrideModules,
  overridePipes,
  SpectatorOverrides,
} from '../spectator/create-factory';
import { InferSignalInputs, isType } from '../types';

import { SpyObject } from '../mock';
import { ActivatedRouteStub } from './activated-route-stub';
import { initialRoutingModule } from './initial-module';
import { getRoutingDefaultOptions, SpectatorRoutingOptions } from './options';
import { RouteOptions } from './route-options';
import { SpectatorRouting } from './spectator-routing';

/**
 * @publicApi
 */
export type SpectatorRoutingOverrides<C> = SpectatorOverrides<C> & RouteOptions;

/**
 * @publicApi
 */
export type SpectatorRoutingFactory<C> = (options?: SpectatorRoutingOverrides<C>) => SpectatorRouting<C>;

/**
 * @publicApi
 */
export function createRoutingFactory<C>(typeOrOptions: Type<C> | SpectatorRoutingOptions<C>): SpectatorRoutingFactory<C> {
  const options = isType(typeOrOptions)
    ? getRoutingDefaultOptions<C>({ component: typeOrOptions })
    : getRoutingDefaultOptions(typeOrOptions);

  const moduleMetadata = initialRoutingModule<C>(options);

  beforeEach(
    waitForAsync(() => {
      addMatchers(customMatchers);
      TestBed.configureTestingModule(moduleMetadata);

      overrideModules(options);
      overrideComponents(options);
      overrideDirectives(options);
      overridePipes(options);

      overrideComponentIfProviderOverridesSpecified(options);

      TestBed.compileComponents();
    })
  );

  return (overrides?: SpectatorRoutingOverrides<C>) => {
    const defaults: SpectatorRoutingOverrides<C> = {
      props: {},
      detectChanges: true,
      providers: [],
    };

    const { detectChanges, props, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    const { params, queryParams, data, fragment, url, root, parent, children, firstChild } = { ...options, ...overrides };

    TestBed.overrideProvider(ActivatedRoute, {
      useValue: new ActivatedRouteStub({ params, queryParams, data, fragment, url, root, parent, children, firstChild }),
    });
    const ngZone = (<any>TestBed).inject ? TestBed.inject(NgZone) : TestBed.get(NgZone);

    return ngZone.run(() => {
      const spectator = createSpectatorRouting(options, props);

      spectator.router.initialNavigation();

      if (options.detectChanges && detectChanges) {
        spectator.detectChanges();
      }

      return spectator;
    });
  };
}

function createSpectatorRouting<C>(options: Required<SpectatorRoutingOptions<C>>, props?: InferSignalInputs<C>): SpectatorRouting<C> {
  const fixture = TestBed.createComponent(options.component);
  const debugElement = fixture.debugElement;

  const component = setProps(fixture.componentRef, props);

  /**
   * Back compatibility, angular under 9 version doesnt have a inject function
   */
  if (!TestBed.inject) {
    return new SpectatorRouting(fixture, debugElement, component, TestBed.get(Router), TestBed.get(ActivatedRoute));
  }

  return new SpectatorRouting(
    fixture,
    debugElement,
    component,
    TestBed.inject(Router),
    TestBed.inject(ActivatedRoute) as SpyObject<ActivatedRouteStub>
  );
}
