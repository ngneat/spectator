import { TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';
import { MockProvider } from '../mock';

export interface SpectatorBaseOptions extends TestModuleMetadata {
  disableAnimations?: boolean;
  entryComponents?: Type<any>[];
  mocks?: Type<any>[];
  mockProvider?: MockProvider;
}
