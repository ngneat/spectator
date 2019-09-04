import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { SpectatorOverrides } from '../spectator/create-factory';
import { isType } from '../types';

import { HostComponent } from './host-component';
import { initialSpectatorWithHostModule } from './initial-module';
import { getSpectatorHostDefaultOptions, SpectatorHostOptions } from './options';
import { SpectatorHost } from './spectator-host';

/**
 * @publicApi
 */
export type SpectatorHostFactory<C, H> = <HP extends H extends HostComponent ? any : Partial<H>>(
  template: string,
  overrides?: SpectatorHostOverrides<C, H, HP>
) => SpectatorHost<C, H & HP>;

/**
 * @publicApi
 */
export interface SpectatorHostOverrides<C, H, HP> extends SpectatorOverrides<C> {
  hostProps?: HP;
}

/**
 * @deprecated Use createHostFactory instead. To be removed in v5.
 */
export function createHostComponentFactory<C, H = HostComponent>(
  typeOrOptions: Type<C> | SpectatorHostOptions<C, H>
): SpectatorHostFactory<C, H> {
  return createHostFactory<C, H>(typeOrOptions);
}

/**
 * @publicApi
 */
export function createHostFactory<C, H = HostComponent>(typeOrOptions: Type<C> | SpectatorHostOptions<C, H>): SpectatorHostFactory<C, H> {
  const options = isType(typeOrOptions)
    ? getSpectatorHostDefaultOptions<C, H>({ component: typeOrOptions })
    : getSpectatorHostDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorWithHostModule<C, H>(options);

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);

    if (options.componentProviders.length || options.componentMocks.length) {
      TestBed.overrideComponent(options.component, {
        set: {
          providers: [...options.componentProviders, ...options.componentMocks.map(p => options.mockProvider(p))]
        }
      });
    }
  }));

  return <HP>(template: string, overrides?: SpectatorHostOverrides<C, H, HP>) => {
    const defaults: SpectatorHostOverrides<C, H, HP> = { props: {}, hostProps: {} as any, detectChanges: true, providers: [] };
    const { detectChanges, props, hostProps, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: moduleMetadata.entryComponents
      }
    }).overrideComponent(options.host, {
      set: { template }
    });

    const spectator = createSpectatorHost(options, props, hostProps);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorHost<C, H, HP>(
  options: Required<SpectatorHostOptions<C, H>>,
  props?: Partial<C>,
  hostProps?: HP
): SpectatorHost<C, H & HP> {
  const hostFixture = TestBed.createComponent(options.host);
  const debugElement = hostFixture.debugElement.query(By.directive(options.component));

  const hostComponent = setProps(hostFixture.componentInstance, hostProps);
  const component = setProps(debugElement.componentInstance, props);

  return new SpectatorHost(
    hostComponent,
    hostFixture.debugElement,
    hostFixture.nativeElement,
    hostFixture,
    debugElement,
    component,
    debugElement.nativeElement
  );
}
