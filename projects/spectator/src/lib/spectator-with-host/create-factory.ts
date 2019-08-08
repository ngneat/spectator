import { Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import * as customMatchers from '../matchers';
import { HostComponent } from '../spectator/host-component';

import { SpectatorOptions } from '../spectator/options';
import { CreateComponentOptions, isType } from '../types';
import { SpectatorWithHost } from './spectator-with-host';
import { initialModule } from '../spectator/initial-module';

export function createHostComponentFactory<Component, Host = HostComponent>(typeOrOptions: SpectatorOptions<Component, Host> | Type<Component>): (template: string, options?: CreateComponentOptions<Component>) => SpectatorWithHost<Component, Host> {
  const moduleMetadata = initialModule<Component, Host>(typeOrOptions);

  const factoryCD = isType(typeOrOptions) || typeOrOptions.detectChanges === undefined ? true : typeOrOptions.detectChanges;
  const componentProviders = isType(typeOrOptions) ? [] : typeOrOptions.componentProviders || [];

  beforeEach(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);

    if (componentProviders) {
      TestBed.overrideComponent(moduleMetadata.component, {
        set: {
          providers: componentProviders
        }
      });
    }
  });

  return (template: string, options?: CreateComponentOptions<Component>) => {
    const defaults: CreateComponentOptions<Component> = { props: {}, detectChanges: true, providers: [] };
    const { detectChanges, props, providers } = { ...defaults, ...options };

    if (providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: moduleMetadata.entryComponents
      }
    });

    TestBed.overrideComponent(moduleMetadata.host, { set: { template: template } });

    const withHost = new SpectatorWithHost<Component, Host>();
    withHost.hostFixture = TestBed.createComponent(moduleMetadata.host);
    //  The host component instance
    withHost.hostComponent = withHost.hostFixture.componentInstance;
    withHost.hostDebugElement = withHost.hostFixture.debugElement;
    withHost.hostElement = withHost.hostFixture.nativeElement;
    // The tested component debug element
    withHost.debugElement = withHost.hostFixture.debugElement.query(By.directive(moduleMetadata.component));
    // The tested component instance, rendered inside the host
    if (withHost.debugElement) {
      withHost.component = withHost.debugElement.componentInstance;
      withHost.element = withHost.debugElement.nativeElement;
    }

    if (props) {
      Object.keys(props).forEach(key => {
        withHost.component[key] = props[key];
      });
    }

    if (factoryCD && detectChanges) {
      withHost.hostFixture.detectChanges();
    }

    return withHost;
  };
}
