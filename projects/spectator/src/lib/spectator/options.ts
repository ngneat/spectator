import { Type, Binding } from '@angular/core';

import { getDefaultBaseOptions, BaseSpectatorOptions } from '../base/options';
import { merge } from '../internals/merge';
import { OptionalsRequired } from '../types';

/**
 * @publicApi
 */
export interface SpectatorOptions<C> extends BaseSpectatorOptions {
  component: Type<C>;
  /** @default false */
  shallow?: boolean;
  /** set options for TestBed.createComponent(component, options: TestComponentOptions)  */
  bindings?: Binding[]; // TestComponentOptions['bindings'];
  /** Override the component's providers */
  componentProviders?: any[];
  /** Override the component's view providers */
  componentViewProviders?: any[];
  /** Override the component's imports in case of testing standalone component */
  componentImports?: any[];
  /** @default true */
  detectChanges?: boolean;
  /** @default true */
  declareComponent?: boolean;
  /** Component providers that will automatically be mocked */
  componentMocks?: Type<any>[];
  /** Component view providers that will be automatically mocked */
  componentViewProvidersMocks?: Type<any>[];
}

const defaultSpectatorOptions: OptionalsRequired<SpectatorOptions<any>> = {
  ...getDefaultBaseOptions(),
  shallow: false,
  declareComponent: true,
  detectChanges: true,
  componentProviders: [],
  componentViewProviders: [],
  componentImports: [],
  componentMocks: [],
  componentViewProvidersMocks: [],
  bindings: [],
};

/**
 * @internal
 */
export function getSpectatorDefaultOptions<C>(overrides?: SpectatorOptions<C>): Required<SpectatorOptions<C>> {
  return merge(defaultSpectatorOptions, overrides);
}
