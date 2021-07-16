import { Provider, Type } from '@angular/core';
import { TestBed, TestBedStatic } from '@angular/core/testing';

import { BaseSpectatorOverrides } from '../base/options';
import { isType, doesServiceImplementsOnDestroy } from '../types';

import { initialServiceModule } from './initial-module';
import { getDefaultServiceOptions, SpectatorServiceOptions } from './options';
import { SpectatorService } from './spectator-service';
import { overrideModules } from '../spectator/create-factory';

/**
 * @publicApi
 */
export type SpectatorServiceFactory<S> = (overrides?: SpectatorServiceOverrides<S>) => SpectatorService<S>;

/**
 * @publicApi
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SpectatorServiceOverrides<S> extends BaseSpectatorOverrides {}

/**
 * @publicApi
 */
export function createServiceFactory<S>(typeOrOptions: Type<S> | SpectatorServiceOptions<S>): SpectatorServiceFactory<S> {
  const service = isType(typeOrOptions) ? typeOrOptions : typeOrOptions.service;
  const options = isType(typeOrOptions) ? getDefaultServiceOptions<S>({ service }) : getDefaultServiceOptions(typeOrOptions);

  const moduleMetadata = initialServiceModule(options);

  beforeEach(() => {
    TestBed.configureTestingModule(moduleMetadata);
    overrideModules(options);
  });

  afterEach(() => {
    const testedService = (<any>TestBed).inject
      ? (<{ inject<T>(token: Type<T>, notFoundValue?: T): T } & TestBedStatic>TestBed).inject<S>(service)
      : TestBed.get(service);

    if (doesServiceImplementsOnDestroy(testedService)) {
      // eslint-disable-next-line
      testedService.ngOnDestroy();
    }
  });

  return (overrides?: SpectatorServiceOverrides<S>) => {
    const defaults: SpectatorServiceOverrides<S> = { providers: [] };
    const { providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    return new SpectatorService<S>(TestBed.inject ? TestBed.inject(service) : TestBed.get(service));
  };
}
