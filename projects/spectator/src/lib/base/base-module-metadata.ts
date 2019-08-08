import { TestModuleMetadata } from '@angular/core/testing';
import { Type } from '@angular/core';

export interface BaseModuleMetadata extends TestModuleMetadata {
  entryComponents?: Type<any>[];
}
