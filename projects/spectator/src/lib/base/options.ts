import { Component, Directive, NgModule, Pipe, Provider, SchemaMetadata, Type } from '@angular/core';
import { DeferBlockBehavior, MetadataOverride, ModuleTeardownOptions } from '@angular/core/testing';

import { merge } from '../internals/merge';
import { mockProvider, MockProvider } from '../mock';
import { OptionalsRequired } from '../types';

/**
 * @internal
 */
export interface BaseSpectatorOptions {
  /** @default true */
  disableAnimations?: boolean;
  entryComponents?: Type<any>[];
  /** Providers that will automatically be mocked */
  mocks?: Type<any>[];
  mockProvider?: MockProvider;
  providers?: any[];
  declarations?: any[];
  imports?: any[];
  schemas?: (SchemaMetadata | any[])[];
  overrideModules?: [Type<any>, MetadataOverride<NgModule>][];
  /** Override the component's providers */
  overrideComponents?: [Type<any>, MetadataOverride<Component>][];
  /** Override directives in case of testing standalone directive */
  overrideDirectives?: [Type<any>, MetadataOverride<Directive>][];
  /** Override pipes in case of testing standalone pipe */
  overridePipes?: [Type<any>, MetadataOverride<Pipe>][];
  teardown?: ModuleTeardownOptions;
  deferBlockBehavior?: DeferBlockBehavior;
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
  deferBlockBehavior: DeferBlockBehavior.Playthrough,
};

/**
 * @internal
 */
export function getDefaultBaseOptions(options?: BaseSpectatorOptions): Required<BaseSpectatorOptions> {
  return merge<BaseSpectatorOptions>(defaultOptions, options);
}
