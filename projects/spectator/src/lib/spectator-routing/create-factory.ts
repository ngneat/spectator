import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { SpectatorOverrides } from '../spectator/create-factory';
import { isType } from '../types';

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

    const { params, queryParams, data, fragment } = { ...options, ...overrides };

    TestBed.overrideProvider(ActivatedRoute, {
      useValue: new ActivatedRouteStub({ params, queryParams, data, fragment })
    });

    const spectator = createSpectatorRouting(options);

    setProps(spectator.component, props);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorRouting<C>(options: Required<SpectatorRoutingOptions<C>>): SpectatorRouting<C> {
  const fixture = TestBed.createComponent(options.component);

  return new SpectatorRouting<C>(fixture, fixture.debugElement, TestBed.get(ActivatedRoute));
}
