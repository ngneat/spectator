import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { isType } from '../types';
import { HostComponent } from '../spectator-host/host-component';
import { BaseSpectatorOverrides } from '../base/options';

import { initialSpectatorDirectiveModule } from './initial-module';
import { getSpectatorDirectiveDefaultOptions, SpectatorDirectiveOptions } from './options';
import { SpectatorDirective } from './spectator-directive';

/**
 * @publicApi
 */
export type SpectatorDirectiveFactory<D, H> = (template: string, overrides?: SpectatorDirectiveOverrides<D, H>) => SpectatorDirective<D, H>;

/**
 * @publicApi
 */
export interface SpectatorDirectiveOverrides<D, H> extends BaseSpectatorOverrides {
  detectChanges?: boolean;
  props?: Partial<D>;
  hostProps?: H extends HostComponent
    ? {
        [key: string]: any;
      }
    : Partial<H>;
}

/**
 * @publicApi
 */
export function createDirectiveFactory<D, H = HostComponent>(
  typeOrOptions: Type<D> | SpectatorDirectiveOptions<D, H>
): SpectatorDirectiveFactory<D, H> {
  const options = isType(typeOrOptions)
    ? getSpectatorDirectiveDefaultOptions<D, H>({ directive: typeOrOptions })
    : getSpectatorDirectiveDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorDirectiveModule<D, H>(options);

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);
  }));

  return (template: string, overrides?: SpectatorDirectiveOverrides<D, H>) => {
    const defaults: SpectatorDirectiveOverrides<D, H> = { props: {}, hostProps: {} as any, detectChanges: true, providers: [] };
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

    const spectator = createSpectatorDirective<D, H>(options);

    setProps(spectator.directive, props);
    setProps(spectator.hostComponent, hostProps);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorDirective<D, H>(options: Required<SpectatorDirectiveOptions<D, H>>): SpectatorDirective<D, H> {
  const hostFixture = TestBed.createComponent(options.host);
  const debugElement = hostFixture.debugElement.query(By.directive(options.directive));

  return new SpectatorDirective<D, H>(
    hostFixture.componentInstance,
    hostFixture,
    hostFixture.debugElement,
    debugElement.injector.get(options.directive),
    debugElement.nativeElement
  );
}
