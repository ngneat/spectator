import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BaseSpectatorOverrides } from '../base/options';
import { isType } from '../types';

import { initialHttpModule } from './initial-module';
import { getDefaultHttpOptions, SpectatorHttpOptions } from './options';
import { SpectatorHttp } from './spectator-http';
import { overrideModules } from '../spectator/create-factory';

/**
 * @publicApi
 */
export type SpectatorHttpFactory<S> = (overrides?: CreateHttpOverrides<S>) => SpectatorHttp<S>;

/**
 * @publicApi
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateHttpOverrides<S> extends BaseSpectatorOverrides {}

/**
 * @publicApi
 */
export function createHttpFactory<S>(typeOrOptions: Type<S> | SpectatorHttpOptions<S>): SpectatorHttpFactory<S> {
  const service = isType(typeOrOptions) ? typeOrOptions : typeOrOptions.service;
  const options = isType(typeOrOptions) ? getDefaultHttpOptions<S>({ service }) : getDefaultHttpOptions(typeOrOptions);
  const moduleMetadata = initialHttpModule(options);

  beforeEach(() => {
    TestBed.configureTestingModule(moduleMetadata);
    overrideModules(options);
  });

  afterEach(() => {
    if (TestBed.inject) {
      TestBed.inject(HttpTestingController).verify();
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

    /**
     * Back compatibility, angular under 9 version doesnt have a inject function
     */
    if (!TestBed.inject) {
      return new SpectatorHttp<S>(TestBed.get(service), TestBed.get(HttpClient), TestBed.get(HttpTestingController));
    }

    return new SpectatorHttp<S>(TestBed.inject(service), TestBed.inject(HttpClient), TestBed.inject(HttpTestingController));
  };
}
