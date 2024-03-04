import { TestModuleMetadata } from '@angular/core/testing';

let globals: TestModuleMetadata = {
  providers: [],
  declarations: [],
  imports: [],
};

export function defineGlobalsInjections(config: TestModuleMetadata): void {
  globals = { ...globals, ...config };
}

export function getGlobalsInjections(): TestModuleMetadata {
  return globals;
}
