import { NgModule, Provider, SchemaMetadata, Type } from '@angular/core';
import { MetadataOverride } from '@angular/core/testing';

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
  overrideModules: []
};

/**
 * @internal
 */
export function getDefaultBaseOptions(options?: BaseSpectatorOptions): Required<BaseSpectatorOptions> {
  return merge<BaseSpectatorOptions>(defaultOptions, options);
}
