import { TestBed } from '@angular/core/testing';
import { initialInjectionContextModule as initialInjectionContextModule } from './initial-module';
import { getDefaultFunctionOptions, SpectatorInjectionContextOptions } from './options';
import { overrideModules } from '../spectator/create-factory';
import { BaseSpectatorOverrides } from '../base/options';
import { SpectatorInjectionContext } from './spectator-injection-context';
import { Provider } from '@angular/core';

/**
 * @publicApi
 */
export type SpectatorInjectionContextFactory = (overrides?: SpectatorInjectionContextOverrides) => SpectatorInjectionContext;

/**
 * @publicApi
 */
export interface SpectatorInjectionContextOverrides extends BaseSpectatorOverrides {}

/**
 * @publicApi
 */
export function createInjectionContextFactory(options: SpectatorInjectionContextOptions): SpectatorInjectionContextFactory {
  const fullOptions = getDefaultFunctionOptions(options);

  const moduleMetadata = initialInjectionContextModule(fullOptions);

  beforeEach(() => {
    TestBed.configureTestingModule(moduleMetadata);
    overrideModules(fullOptions);
  });

  return (overrides?: SpectatorInjectionContextOverrides) => {
    const defaults: SpectatorInjectionContextOverrides = { providers: [] };
    const { providers } = { ...defaults, ...overrides };

    if (providers && providers.length) {
      providers.forEach((provider: Provider) => {
        TestBed.overrideProvider((provider as any).provide, provider as any);
      });
    }

    return new SpectatorInjectionContext();
  };
}
