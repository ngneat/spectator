import { TestModuleMetadata } from '@angular/core/testing';

let globals: TestModuleMetadata = {
  providers: [],
  declarations: [],
  imports: []
};

export function defineGlobalsInjections(config: TestModuleMetadata) {
  globals = { ...globals, ...config };
}

export function getGlobalsInjections() {
  return globals;
}
