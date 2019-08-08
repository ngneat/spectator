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
    const defaults: SpectatorOverrides<C> = { properties: {}, detectChanges: true, providers: [] };
    const { detectChanges, properties, providers } = { ...defaults, ...overrides };

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

    const spectator = new SpectatorWithHost<C, H>();

    spectator.hostFixture = TestBed.createComponent(options.host);

    //  The host component instance
    spectator.hostComponent = spectator.hostFixture.componentInstance;
    spectator.hostDebugElement = spectator.hostFixture.debugElement;
    spectator.hostElement = spectator.hostFixture.nativeElement;

    // The tested component debug element
    spectator.debugElement = spectator.hostFixture.debugElement.query(By.directive(options.component));

    // The tested component instance, rendered inside the host
    if (spectator.debugElement) {
      spectator.component = spectator.debugElement.componentInstance;
      spectator.element = spectator.debugElement.nativeElement;
    }

    if (properties) {
      Object.keys(properties).forEach(key => {
        spectator.component[key] = properties[key];
      });
    }

    if (options.detectChanges && detectChanges) {
      spectator.hostFixture.detectChanges();
    }

    return spectator;
  };
}