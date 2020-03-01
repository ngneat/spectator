import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { BaseSpectatorOverrides } from '../base/options';
import { isType } from '../types';
import { HostComponent } from '../spectator-host/host-component';

import { initialSpectatorPipeModule } from './initial-module';
import { getSpectatorPipeDefaultOptions, SpectatorPipeOptions } from './options';
import { SpectatorPipe } from './spectator-pipe';

/**
 * @publicApi
 */
export type SpectatorPipeFactory<P, H> = <HP>(
  templateOrOverrides?: string | SpectatorPipeOverrides<H, HP>,
  overrides?: SpectatorPipeOverrides<H, HP>
) => SpectatorPipe<P, H & (HostComponent extends H ? HP : unknown)>;

/**
 * @publicApi
 */
export interface SpectatorPipeOverrides<H, HP> extends BaseSpectatorOverrides {
  detectChanges?: boolean;
  hostProps?: HostComponent extends H ? HP : Partial<H>;
}

/**
 * @publicApi
 */
export function createPipeFactory<P, H = HostComponent>(typeOrOptions: Type<P> | SpectatorPipeOptions<P, H>): SpectatorPipeFactory<P, H> {
  const options = isType(typeOrOptions)
    ? getSpectatorPipeDefaultOptions<P, H>({ pipe: typeOrOptions })
    : getSpectatorPipeDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorPipeModule<P, H>(options);

  beforeEach(async(() => {
    jasmine.addMatchers(customMatchers as any);
    TestBed.configureTestingModule(moduleMetadata);
  }));

  return <HP>(templateOrOverrides?: string | SpectatorPipeOverrides<H, HP>, overrides?: SpectatorPipeOverrides<H, HP>) => {
    const defaults: SpectatorPipeOverrides<H, HP> = {
      hostProps: {} as any,
      detectChanges: true,
      providers: []
    };
    const resolvedOverrides = typeof templateOrOverrides === 'object' ? templateOrOverrides : overrides;
    const { detectChanges, hostProps, providers } = { ...defaults, ...resolvedOverrides };
    const template = typeof templateOrOverrides === 'string' ? templateOrOverrides : undefined;

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    if (template) {
      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: moduleMetadata.entryComponents
        }
      }).overrideComponent(options.host, {
        set: { template }
      });
    }

    const spectator = createSpectatorPipe(options, hostProps);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorPipe<P, H, HP>(options: Required<SpectatorPipeOptions<P, H>>, hostProps?: HP): SpectatorPipe<P, H & HP> {
  const hostFixture = TestBed.createComponent(options.host);
  const debugElement = hostFixture.debugElement;

  const hostComponent = setProps(hostFixture.componentInstance, hostProps);

  return new SpectatorPipe(hostComponent, hostFixture, hostFixture.debugElement, debugElement.nativeElement);
}
