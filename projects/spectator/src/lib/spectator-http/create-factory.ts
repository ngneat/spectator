import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BaseSpectatorOverrides } from '../base/options';
import { isType } from '../types';

import { initialHttpModule } from './initial-module';
import { getDefaultHttpOptions, isDeprecated, SpectatorHttpOptions } from './options';
import { SpectatorHttp } from './spectator-http';

/**
 * @publicApi
 */
export type SpectatorHttpFactory<S> = (overrides?: CreateHttpOverrides<S>) => SpectatorHttp<S>;

/**
 * @publicApi
 */
// tslint:disable-next-line:no-empty-interface
export interface CreateHttpOverrides<S> extends BaseSpectatorOverrides {}

/**
 * @publicApi
 */
export function createHttpFactory<S>(typeOrOptions: Type<S> | SpectatorHttpOptions<S>): SpectatorHttpFactory<S> {
  const service = isType(typeOrOptions) ? typeOrOptions : isDeprecated(typeOrOptions) ? typeOrOptions.dataService : typeOrOptions.service;
  const options = isType(typeOrOptions) ? getDefaultHttpOptions<S>({ service }) : getDefaultHttpOptions(typeOrOptions);
  const moduleMetadata = initialHttpModule(options);

  beforeEach(() => {
    TestBed.configureTestingModule(moduleMetadata);
  });

  afterEach(() => {
    if ((<any>TestBed).inject) {
      (<any>TestBed).inject(HttpTestingController).verify();
    } else {
      TestBed.get(HttpTestingController).verify();
    }
  });

  return (overrides?: CreateHttpOverrides<S>) => {
    const defaults: CreateHttpOverrides<S> = { providers: [] };
    const { providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    return new SpectatorHttp<S>(TestBed.get(service), TestBed.get(HttpClient), TestBed.get(HttpTestingController));
  };
}
