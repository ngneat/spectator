import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { SpectatorOverrides } from '../spectator/create-factory';
import { isType } from '../types';

import { ActivatedRouteStub } from './activated-route-stub';
import { initialRoutingModule } from './initial-module';
import { getRoutingDefaultOptions, SpectatorWithRoutingOptions } from './options';
import { RouteOptions } from './route-options';
import { SpectatorWithRouting } from './spectator-with-routing';

/**
 * @publicApi
 */
export type SpectatorWithRoutingOverrides<C> = SpectatorOverrides<C> & RouteOptions;

/**
 * @publicApi
 */
export type SpectatorWithRoutingFactory<C> = (options?: SpectatorWithRoutingOverrides<C>) => SpectatorWithRouting<C>;

/**
 * @publicApi
 */
export function createRoutedComponentFactory<C>(typeOrOptions: Type<C> | SpectatorWithRoutingOptions<C>): SpectatorWithRoutingFactory<C> {
  const options = isType(typeOrOptions)
    ? getRoutingDefaultOptions<C>({ component: typeOrOptions })
    : getRoutingDefaultOptions(typeOrOptions);

  const moduleMetadata = initialRoutingModule<C>(options);

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);

    if (options.componentProviders.length) {
      TestBed.overrideComponent(options.component, {
        set: {
          providers: options.componentProviders
        }
      });
    }

    TestBed.compileComponents();
  }));

  return (overrides?: SpectatorWithRoutingOverrides<C>) => {
    const defaults: SpectatorWithRoutingOverrides<C> = {
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

    const { params, queryParams, data } = { ...options, ...overrides };

    TestBed.overrideProvider(ActivatedRoute, {
      useValue: new ActivatedRouteStub({ params, queryParams, data })
    });

    const spectator = createSpectatorWithRouting(options);

    setProps(spectator.component, props);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorWithRouting<C>(options: Required<SpectatorWithRoutingOptions<C>>): SpectatorWithRouting<C> {
  const fixture = TestBed.createComponent(options.component);

  return new SpectatorWithRouting<C>(fixture, fixture.debugElement, TestBed.get(ActivatedRoute));
}
