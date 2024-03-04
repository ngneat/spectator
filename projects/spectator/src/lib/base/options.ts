import { Component, Directive, NgModule, Pipe, Provider, SchemaMetadata, Type } from '@angular/core';
import { MetadataOverride, ModuleTeardownOptions } from '@angular/core/testing';

import { merge } from '../internals/merge';
import { mockProvider, MockProvider } from '../mock';
import { OptionalsRequired } from '../types';

/**
 * @internal
 */
export interface BaseSpectatorOptions {
  disableAnimations?: boolean;
  entryComponents?: Type<any>[];
  mocks?: Type<any>[];
  mockProvider?: MockProvider;
  providers?: any[];
  declarations?: any[];
  imports?: any[];
  schemas?: (SchemaMetadata | any[])[];
  overrideModules?: [Type<any>, MetadataOverride<NgModule>][];
  overrideComponents?: [Type<any>, MetadataOverride<Component>][];
  overrideDirectives?: [Type<any>, MetadataOverride<Directive>][];
  overridePipes?: [Type<any>, MetadataOverride<Pipe>][];
  teardown?: ModuleTeardownOptions;
  errorOnUnknownElements?: boolean;
  errorOnUnknownProperties?: boolean;
}

/**
 * @internal
 */
export interface BaseSpectatorOverrides {
  providers?: Provider[];
}

const defaultOptions: OptionalsRequired<BaseSpectatorOptions> = {
  disableAnimations: true,
  entryComponents: [],
  mocks: [],
  mockProvider,
  providers: [],
  declarations: [],
  imports: [],
  schemas: [],
  overrideModules: [],
  overrideComponents: [],
  overrideDirectives: [],
  overridePipes: [],
  teardown: { destroyAfterEach: false },
  errorOnUnknownElements: false,
  errorOnUnknownProperties: false,
};

/**
 * @internal
 */
export function getDefaultBaseOptions(options?: BaseSpectatorOptions): Required<BaseSpectatorOptions> {
  return merge<BaseSpectatorOptions>(defaultOptions, options);
}
