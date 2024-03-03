import { Provider, Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { BaseSpectatorOverrides } from '../base/options';
import { addMatchers } from '../core';
import { nodeByDirective } from '../internals/node-by-directive';
import { setHostProps } from '../internals/query';
import * as customMatchers from '../matchers';
import { HostComponent } from '../spectator-host/host-component';
import { isType } from '../types';

import { overrideComponents, overrideDirectives, overrideModules, overridePipes } from '../spectator/create-factory';
import { initialSpectatorDirectiveModule } from './initial-module';
import { SpectatorDirectiveOptions, getSpectatorDirectiveDefaultOptions } from './options';
import { SpectatorDirective } from './spectator-directive';

/**
 * @publicApi
 */
export type SpectatorDirectiveFactory<D, H> = <HP>(
  template: string,
  overrides?: SpectatorDirectiveOverrides<H, HP>,
) => SpectatorDirective<D, H & (HostComponent extends H ? HP : unknown)>;

/**
 * @publicApi
 */
export type PresetSpectatorDirectiveFactory<D, H> = <HP>(
  template?: string,
  overrides?: SpectatorDirectiveOverrides<H, HP>,
) => SpectatorDirective<D, H & (HostComponent extends H ? HP : unknown)>;

/**
 * @publicApi
 */
export interface SpectatorDirectiveOverrides<H, HP> extends BaseSpectatorOverrides {
  detectChanges?: boolean;
  hostProps?: HostComponent extends H ? HP : Partial<H>;
  directiveProviders?: Provider[];
}

/**
 * @publicApi
 */
export function createDirectiveFactory<D, H = HostComponent>(
  options: SpectatorDirectiveOptions<D, H> & { template: string },
): PresetSpectatorDirectiveFactory<D, H>;
/**
 * @publicApi
 */
export function createDirectiveFactory<D, H = HostComponent>(
  typeOrOptions: Type<D> | SpectatorDirectiveOptions<D, H>,
): SpectatorDirectiveFactory<D, H>;
export function createDirectiveFactory<D, H = HostComponent>(
  typeOrOptions: Type<D> | SpectatorDirectiveOptions<D, H>,
): SpectatorDirectiveFactory<D, H> {
  const options = isType(typeOrOptions)
    ? getSpectatorDirectiveDefaultOptions<D, H>({ directive: typeOrOptions })
    : getSpectatorDirectiveDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorDirectiveModule<D, H>(options);

  beforeEach(waitForAsync(() => {
    addMatchers(customMatchers);
    TestBed.configureTestingModule(moduleMetadata);
    overrideModules(options);
    overrideComponents(options);
    overrideDirectives(options);
    overridePipes(options);
  }));

  return <HP>(template?: string, overrides?: SpectatorDirectiveOverrides<H, HP>) => {
    const defaults: SpectatorDirectiveOverrides<H, HP> = {
      hostProps: {} as any,
      detectChanges: true,
      providers: [],
    };
    const { detectChanges, hostProps, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    TestBed.overrideModule(BrowserDynamicTestingModule, {}).overrideComponent(options.host, {
      set: { template: template || options.template },
    });

    if (options.directiveProviders.length || options.directiveMocks.length) {
      TestBed.overrideDirective(options.directive, {
        set: { providers: [...options.directiveProviders, ...options.directiveMocks.map((p) => options.mockProvider(p))] },
      });
    }

    const spectator = createSpectatorDirective(options, hostProps);

    if (options.detectChanges && detectChanges) {
      spectator.detectChanges();
    }

    return spectator;
  };
}

function createSpectatorDirective<D, H, HP>(
  options: Required<SpectatorDirectiveOptions<D, H>>,
  hostProps?: HP,
): SpectatorDirective<D, H & HP> {
  const hostFixture = TestBed.createComponent(options.host);
  const debugElement = hostFixture.debugElement.query(By.directive(options.directive)) || hostFixture.debugElement;
  const debugNode = hostFixture.debugElement.queryAllNodes(nodeByDirective(options.directive))[0];

  if (!debugNode) {
    throw new Error(`Cannot find directive ${options.directive} in host template 😔`);
  }

  const hostComponent = setHostProps(hostFixture.componentRef, hostProps);
  const directive = debugNode.injector.get(options.directive);

  return new SpectatorDirective(hostComponent, hostFixture, hostFixture.debugElement, directive, debugElement.nativeElement);
}
