import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { setComponentProps } from '../internals/query';
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
  const options = isType(typeOrOptions) ? getSpectatorDefaultOptions<C, H>({ component: typeOrOptions }) : getSpectatorDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorModule<C, H>(options);

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

    TestBed.overrideComponent(options.host, {
      set: {
        template: template
      }
    });

    const spectator = createSpectatorWithHost(options);

    setComponentProps(spectator.component, props);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorWithHost<C, H>(options: Required<SpectatorOptions<C, H>>): SpectatorWithHost<C, H> {
  const hostFixture = TestBed.createComponent(options.host);
  const debugElement = hostFixture.debugElement.query(By.directive(options.component));

  return new SpectatorWithHost<C, H>(hostFixture.componentInstance, hostFixture.debugElement, hostFixture.nativeElement, hostFixture, debugElement);
}
