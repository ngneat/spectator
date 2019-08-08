import { BaseModuleMetadata } from './base-module-metadata';
import { SpectatorBaseOptions } from './options';
import { getGlobalsInjections } from '../globals-injections';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockProvider } from '../mock';

const defaultOptions: SpectatorBaseOptions = {
  disableAnimations: true,
  entryComponents: [],
  mocks: [],
  mockProvider: mockProvider
};

export function initialBaseModule(options: SpectatorBaseOptions = {}): BaseModuleMetadata {
  const { declarations: globalDec, providers: globalProviders, imports: globalImports } = getGlobalsInjections();
  const mergedOptions = Object.assign({}, defaultOptions, options);

  @NgModule({ entryComponents: mergedOptions.entryComponents })
  class EntryComponentModule {}

  return {
    declarations: [...globalDec, ...(mergedOptions.declarations || [])],
    imports: [...globalImports, ...(mergedOptions.disableAnimations ? [NoopAnimationsModule] : []), ...(mergedOptions.imports || []), ...(mergedOptions.entryComponents.length ? [EntryComponentModule] : [])],
    providers: [...globalProviders, ...(mergedOptions.providers || []), ...(mergedOptions.mocks || []).map(type => mergedOptions.mockProvider(type))],
    entryComponents: [...mergedOptions.entryComponents]
  };
}
