import { SchemaMetadata, Type } from '@angular/core';
import { ModuleTeardownOptions } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { getGlobalsInjections } from '../globals-injections';

import { BaseSpectatorOptions } from './options';

/**
 * @publicApi
 */
export interface ModuleMetadata {
  declarations: any[];
  imports: any[];
  providers: any[];
  entryComponents: Type<any>[];
  schemas?: (SchemaMetadata | any[])[];
  teardown?: ModuleTeardownOptions;
}

/**
 * @internal
 */
export function initialModule(options: Required<BaseSpectatorOptions>): ModuleMetadata {
  const globals = { imports: [], declarations: [], providers: [], ...getGlobalsInjections() };

  return {
    declarations: [...globals.declarations, ...options.declarations, ...options.entryComponents],
    imports: [...(options.disableAnimations ? [NoopAnimationsModule] : []), ...globals.imports, ...options.imports],
    providers: [...globals.providers, ...options.providers, ...options.mocks.map(type => options.mockProvider(type))],
    entryComponents: [...options.entryComponents],
    teardown: {...options.teardown}
  };
}
