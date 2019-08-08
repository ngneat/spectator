import { Provider, Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { BaseSpectatorOverrides } from '../base/options';
import { isType } from '../types';

import { initialServiceModule } from './initial-module';
import { getDefaultServiceOptions, SpectatorServiceOptions } from './options';
import { SpectatorService } from './spectator-service';

/**
 * @pubicApi
 */
export type SpectatorServiceFactory<S> = (overrides?: CreateServiceOverrides<S>) => SpectatorService<S>;

/**
 * @pubicApi
 */
// tslint:disable-next-line:no-empty-interface
export interface CreateServiceOverrides<S> extends BaseSpectatorOverrides {}

/**
 * @pubicApi
 */
export function createServiceFactory<S>(typeOrOptions: Type<S> | SpectatorServiceOptions<S>): SpectatorServiceFactory<S> {
  const service = isType(typeOrOptions) ? typeOrOptions : typeOrOptions.service;
  const options = isType(typeOrOptions) ? getDefaultServiceOptions<S>({ service }) : getDefaultServiceOptions(typeOrOptions);
  const moduleMetadata = initialServiceModule(options);

  moduleMetadata.providers.push(options.service);

  console.log('meta', moduleMetadata);

  beforeEach(() => {
    TestBed.configureTestingModule(moduleMetadata);
  });

  return (overrides?: CreateServiceOverrides<S>) => {
    const defaults: CreateServiceOverrides<S> = { providers: [] };
    const { providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    return new SpectatorService<S>(TestBed.get(service));
  };
}
