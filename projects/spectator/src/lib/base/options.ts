import { Provider, SchemaMetadata, Type } from '@angular/core';

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
  schemas: []
};

/**
 * @internal
 */
export function getDefaultBaseOptions(options?: BaseSpectatorOptions): Required<BaseSpectatorOptions> {
  return merge<BaseSpectatorOptions>(defaultOptions, options);
}
