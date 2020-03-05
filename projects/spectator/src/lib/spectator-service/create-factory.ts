import { Provider, Type } from '@angular/core';
import { TestBed, TestBedStatic } from '@angular/core/testing';

import { BaseSpectatorOverrides } from '../base/options';
import { isType, doesServiceImplementsOnDestroy } from '../types';

import { initialServiceModule } from './initial-module';
import { getDefaultServiceOptions, SpectatorServiceOptions } from './options';
import { SpectatorService } from './spectator-service';

/**
 * @publicApi
 */
export type SpectatorServiceFactory<S> = (overrides?: SpectatorServiceOverrides<S>) => SpectatorService<S>;

/**
 * @publicApi
 */
// tslint:disable-next-line:no-empty-interface
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
  });

  afterEach(() => {
    const testedService = (<any>TestBed).inject
      ? (<{ inject<T>(token: Type<T>, notFoundValue?: T): T } & TestBedStatic>TestBed).inject<S>(service)
      : TestBed.get(service);

    if (doesServiceImplementsOnDestroy(testedService)) {
      // tslint:disable-next-line:no-life-cycle-call
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

    return new SpectatorService<S>(TestBed.get(service));
  };
}
