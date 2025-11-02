import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BaseSpectatorOverrides } from '../base/options';
import { addMatchers } from '../core';
import * as customMatchers from '../matchers';
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
export interface CreateHttpOverrides<S> extends BaseSpectatorOverrides {}

/**
 * @publicApi
 */
export function createHttpFactory<S>(typeOrOptions: Type<S> | SpectatorHttpOptions<S>): SpectatorHttpFactory<S> {
  const service = isType(typeOrOptions) ? typeOrOptions : typeOrOptions.service;
  const options = isType(typeOrOptions) ? getDefaultHttpOptions<S>({ service }) : getDefaultHttpOptions(typeOrOptions);
  const moduleMetadata = initialHttpModule(options);

  beforeEach(() => {
    addMatchers(customMatchers);
    TestBed.configureTestingModule(moduleMetadata);
    overrideModules(options);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  return (overrides?: CreateHttpOverrides<S>) => {
    const defaults: CreateHttpOverrides<S> = { providers: [] };
    const { providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    return new SpectatorHttp<S>(TestBed.inject(service), TestBed.inject(HttpClient), TestBed.inject(HttpTestingController));
  };
}
