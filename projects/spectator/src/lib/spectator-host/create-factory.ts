import { Provider, Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { setProps } from '../internals/query';
import * as customMatchers from '../matchers';
import {
  overrideComponentIfProviderOverridesSpecified,
  overrideComponents,
  overrideDirectives,
  overrideModules,
  overridePipes,
  SpectatorOverrides,
} from '../spectator/create-factory';
import { addMatchers } from '../core';
import { isType } from '../types';
import { nodeByDirective } from '../internals/node-by-directive';

import { HostComponent } from './host-component';
import { initialSpectatorWithHostModule } from './initial-module';
import { getSpectatorHostDefaultOptions, SpectatorHostOptions } from './options';
import { SpectatorHost } from './spectator-host';

/**
 * @publicApi
 */
export type SpectatorHostFactory<C, H> = <HP>(
  template: string,
  overrides?: SpectatorHostOverrides<C, H, HP>
) => SpectatorHost<C, H & (HostComponent extends H ? HP : unknown)>;

/**
 * @publicApi
 */
export type PresetSpectatorHostFactory<C, H> = <HP>(
  template?: string,
  overrides?: SpectatorHostOverrides<C, H, HP>
) => SpectatorHost<C, H & (HostComponent extends H ? HP : unknown)>;

/**
 * @publicApi
 */
export interface SpectatorHostOverrides<C, H, HP> extends SpectatorOverrides<C> {
  hostProps?: HostComponent extends H ? HP : Partial<H>;
}

/**
 * @publicApi
 */
export function createHostFactory<C, H = HostComponent>(
  options: SpectatorHostOptions<C, H> & { template: string }
): PresetSpectatorHostFactory<C, H>;
/**
 * @publicApi
 */
export function createHostFactory<C, H = HostComponent>(typeOrOptions: Type<C> | SpectatorHostOptions<C, H>): SpectatorHostFactory<C, H>;
export function createHostFactory<C, H = HostComponent>(typeOrOptions: Type<C> | SpectatorHostOptions<C, H>): SpectatorHostFactory<C, H> {
  const options = isType(typeOrOptions)
    ? getSpectatorHostDefaultOptions<C, H>({ component: typeOrOptions })
    : getSpectatorHostDefaultOptions(typeOrOptions);

  const moduleMetadata = initialSpectatorWithHostModule<C, H>(options);

  beforeEach(
    waitForAsync(() => {
      addMatchers(customMatchers);
      TestBed.configureTestingModule(moduleMetadata).overrideModule(BrowserDynamicTestingModule, {});

      overrideModules(options);
      overrideComponents(options);
      overrideDirectives(options);
      overridePipes(options);

      overrideComponentIfProviderOverridesSpecified(options);
      if (options.template) {
        TestBed.overrideComponent(options.host, {
          set: { template: options.template },
        });
      }
    })
  );

  return <HP>(template?: string, overrides?: SpectatorHostOverrides<C, H, HP>) => {
    const defaults: SpectatorHostOverrides<C, H, HP> = { props: {}, hostProps: {} as any, detectChanges: true, providers: [] };
    const { detectChanges, props, hostProps, providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    if (template) {
      TestBed.overrideComponent(options.host, {
        set: { template: template },
      });
    }

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
  const debugElement = hostFixture.debugElement.query(By.directive(options.component)) || hostFixture.debugElement;
  const debugNode = hostFixture.debugElement.queryAllNodes(nodeByDirective(options.component))[0];

  if (!debugNode) {
    throw new Error(`Cannot find component/directive ${options.component} in host template 😔`);
  }

  const hostComponent = setProps(hostFixture.componentInstance, hostProps);
  const component = setProps(debugNode.injector.get(options.component), props);

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
