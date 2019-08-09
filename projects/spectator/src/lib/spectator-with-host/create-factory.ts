import { Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import * as customMatchers from '../matchers';
import { SpectatorOverrides } from '../spectator/create-factory';
import { HostComponent } from '../spectator/host-component';
import { initialSpectatorModule } from '../spectator/initial-module';
import { getSpectatorDefaultOptions, SpectatorOptions } from '../spectator/options';
import { isType } from '../types';

import { SpectatorWithHost } from './spectator-with-host';

/**
 * @publicApi
 */
export type SpectatorWithHostFactory<Component, Host = HostComponent> = (template: string, options?: SpectatorOverrides<Component>) => SpectatorWithHost<Component, Host>;

/**
 * @publicApi
 */
export function createHostComponentFactory<C, H = HostComponent>(typeOrOptions: Type<C> | SpectatorOptions<C, H>): SpectatorWithHostFactory<C, H> {
  const component = isType(typeOrOptions) ? typeOrOptions : typeOrOptions.component;
  const options = isType(typeOrOptions) ? getSpectatorDefaultOptions<C, H>({ component }) : getSpectatorDefaultOptions(typeOrOptions);
  const moduleMetadata = initialSpectatorModule<C, H>(options);

  beforeEach(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);

    if (options.componentProviders.length) {
      TestBed.overrideComponent(component, {
        set: {
          providers: options.componentProviders
        }
      });
    }
  });

  return (template: string, overrides?: SpectatorOverrides<C>) => {
    const defaults: SpectatorOverrides<C> = { props: {}, detectChanges: true, providers: [] };
    const { detectChanges, props, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: moduleMetadata.entryComponents
      }
    });

    TestBed.overrideComponent(options.host, { set: { template: template } });

    const hostFixture = TestBed.createComponent(options.host);
    const debugElement = hostFixture.debugElement.query(By.directive(options.component));

    const spectator = new SpectatorWithHost<C, H>(hostFixture.componentInstance, hostFixture.debugElement, hostFixture.nativeElement, hostFixture, debugElement);

    if (props) {
      Object.keys(props).forEach(key => {
        spectator.component[key] = props[key];
      });
    }

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}
