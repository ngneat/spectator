import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { setComponentProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { SpectatorOverrides } from '../spectator/create-factory';
import { isType } from '../types';

import { HostComponent } from './host-component';
import { initialSpectatorWithHostModule } from './initial-module';
import { getSpectatorWithHostDefaultOptions, SpectatorWithHostOptions } from './options';
import { SpectatorWithHost } from './spectator-with-host';

/**
 * @publicApi
 */
export type SpectatorWithHostFactory<C, H> = (template: string, options?: SpectatorWithHostOverrides<C, H>) => SpectatorWithHost<C, H>;

/**
 * @publicApi
 */
export interface SpectatorWithHostOverrides<C, H> extends SpectatorOverrides<C> {
  hostProps?: H extends HostComponent
    ? {
        [key: string]: any;
      }
    : Partial<H>;
}

/**
 * @publicApi
 */
export function createHostComponentFactory<C, H = HostComponent>(
  typeOrOptions: Type<C> | SpectatorWithHostOptions<C, H>
): SpectatorWithHostFactory<C, H> {
  const options = isType(typeOrOptions)
    ? getSpectatorWithHostDefaultOptions<C, H>({ component: typeOrOptions })
    : getSpectatorWithHostDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorWithHostModule<C, H>(options);

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
  }));

  return (template: string, overrides?: SpectatorWithHostOverrides<C, H>) => {
    const defaults: SpectatorWithHostOverrides<C, H> = { props: {}, hostProps: {} as any, detectChanges: true, providers: [] };
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

    const spectator = createSpectatorWithHost<C, H>(options);

    setComponentProps(spectator.component, props);
    setComponentProps(spectator.hostComponent, hostProps);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorWithHost<C, H>(options: Required<SpectatorWithHostOptions<C, H>>): SpectatorWithHost<C, H> {
  const hostFixture = TestBed.createComponent(options.host);
  const debugElement = hostFixture.debugElement.query(By.directive(options.component));

  return new SpectatorWithHost<C, H>(
    hostFixture.componentInstance,
    hostFixture.debugElement,
    hostFixture.nativeElement,
    hostFixture,
    debugElement
  );
}
