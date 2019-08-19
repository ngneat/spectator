import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { isType } from '../types';
import { HostComponent } from '../spectator-with-host/host-component';
import { BaseSpectatorOverrides } from '../base/options';

import { initialSpectatorForDirectiveModule } from './initial-module';
import { getSpectatorForDirectiveDefaultOptions, SpectatorForDirectiveOptions } from './options';
import { SpectatorForDirective } from './spectator-for-directive';

/**
 * @publicApi
 */
export type SpectatorForDirectiveFactory<D, H> = (
  template: string,
  overrides?: SpectatorForDirectiveOverrides<D, H>
) => SpectatorForDirective<D, H>;

/**
 * @publicApi
 */
export interface SpectatorForDirectiveOverrides<D, H> extends BaseSpectatorOverrides {
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
export function createHostDirectiveFactory<D, H = HostComponent>(
  typeOrOptions: Type<D> | SpectatorForDirectiveOptions<D, H>
): SpectatorForDirectiveFactory<D, H> {
  const options = isType(typeOrOptions)
    ? getSpectatorForDirectiveDefaultOptions<D, H>({ directive: typeOrOptions })
    : getSpectatorForDirectiveDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorForDirectiveModule<D, H>(options);

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);
  }));

  return (template: string, overrides?: SpectatorForDirectiveOverrides<D, H>) => {
    const defaults: SpectatorForDirectiveOverrides<D, H> = { props: {}, hostProps: {} as any, detectChanges: true, providers: [] };
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

    const spectator = createSpectatorForDirective<D, H>(options);

    setProps(spectator.directive, props);
    setProps(spectator.hostComponent, hostProps);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorForDirective<D, H>(options: Required<SpectatorForDirectiveOptions<D, H>>): SpectatorForDirective<D, H> {
  const hostFixture = TestBed.createComponent(options.host);
  const debugElement = hostFixture.debugElement.query(By.directive(options.directive));

  return new SpectatorForDirective<D, H>(
    hostFixture.componentInstance,
    hostFixture,
    hostFixture.debugElement,
    debugElement.componentInstance,
    debugElement.nativeElement
  );
}
