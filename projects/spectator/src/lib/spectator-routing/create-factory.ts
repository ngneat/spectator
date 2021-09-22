import { Provider, Type, NgZone } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { SpectatorOverrides, overrideComponentIfProviderOverridesSpecified, overrideModules } from '../spectator/create-factory';
import { addMatchers } from '../core';
import { isType } from '../types';

import { ActivatedRouteStub } from './activated-route-stub';
import { initialRoutingModule } from './initial-module';
import { getRoutingDefaultOptions, SpectatorRoutingOptions } from './options';
import { RouteOptions } from './route-options';
import { SpectatorRouting } from './spectator-routing';
import { SpyObject } from '../mock';

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

      overrideComponentIfProviderOverridesSpecified(options);

      TestBed.compileComponents();

      // Configure an ActivatedRouteStub.
      const { params, queryParams, data, fragment, url, root, parent, children, firstChild } = { ...options };
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: new ActivatedRouteStub({ params, queryParams, data, fragment, url, root, parent, children, firstChild })
      });
    })
  );

  return (overrides?: SpectatorRoutingOverrides<C>) => {
    const defaults: SpectatorRoutingOverrides<C> = {
      props: {},
      detectChanges: true,
      providers: []
    };

    const { detectChanges, props, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    if (overrides) {
      // If overrides contains additional router related params, overwrite the ActivatedRoute that was configured above (in beforeEach).
      if ('params' in overrides || 'queryParams' in overrides || 'data' in overrides || 'fragment' in overrides || 'url' in overrides || 'root' in overrides || 'parent' in overrides || 'children' in overrides || 'firstChild' in overrides) {
        const {params, queryParams, data, fragment, url, root, parent, children, firstChild} = {...options, ...overrides};
        TestBed.overrideProvider(ActivatedRoute, {
          useValue: new ActivatedRouteStub({params, queryParams, data, fragment, url, root, parent, children, firstChild})
        });
      }
    }

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

function createSpectatorRouting<C>(options: Required<SpectatorRoutingOptions<C>>, props?: Partial<C>): SpectatorRouting<C> {
  const fixture = TestBed.createComponent(options.component);
  const debugElement = fixture.debugElement;

  const component = setProps(fixture.componentInstance, props);

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
