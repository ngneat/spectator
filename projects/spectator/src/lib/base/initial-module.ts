import { SchemaMetadata, Type } from '@angular/core';
import { DeferBlockBehavior, ModuleTeardownOptions } from '@angular/core/testing';
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
  deferBlockBehavior: DeferBlockBehavior;
  errorOnUnknownElements: boolean;
  errorOnUnknownProperties: boolean;
}

/**
 * @internal
 */
export function initialModule(options: Required<BaseSpectatorOptions>): ModuleMetadata {
  const globals = { imports: [], declarations: [], providers: [], ...getGlobalsInjections() };

  return {
    declarations: [...globals.declarations, ...options.declarations, ...options.entryComponents],
    imports: [...(options.disableAnimations ? [NoopAnimationsModule] : []), ...globals.imports, ...options.imports],
    providers: [...globals.providers, ...options.providers, ...options.mocks.map((type) => options.mockProvider(type))],
    entryComponents: [...options.entryComponents],
    teardown:
      // Caretaker note: we don't want to merge the `globals.teardown` and `options.teardown`, since `options.teardown`
      // is always defined. If the user calls `defineGlobalsInjections({ teardown: { ... } })` and we merge it with
      // `options.teardown`, then `options.teardown` will always override global options.
      { ...(globals.teardown || options.teardown) },
    deferBlockBehavior: globals.deferBlockBehavior || options.deferBlockBehavior,
    errorOnUnknownElements: globals.errorOnUnknownElements || options.errorOnUnknownElements,
    errorOnUnknownProperties: globals.errorOnUnknownProperties || options.errorOnUnknownProperties,
  };
}
