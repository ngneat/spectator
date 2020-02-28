import { DebugNode, Predicate, Type } from '@angular/core';

// TODO (dirkluijk): remove after upgrading to Angular 8.2
// see: https://github.com/angular/angular/commit/10a1e1974b816ebb979dc10586b160ee07ad8356
export function nodeByDirective(type: Type<any>): Predicate<DebugNode> {
  return debugNode => debugNode.providerTokens.includes(type);
}
