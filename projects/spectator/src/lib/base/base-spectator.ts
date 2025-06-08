import { TestBed } from '@angular/core/testing';

import { SpyObject } from '../mock';
import { Token } from '../token';

/**
 * @internal
 */
export abstract class BaseSpectator {
  public inject<T>(token: Token<T>): SpyObject<T> {
    return TestBed.inject(token) as SpyObject<T>;
  }

  /**
   * Execute any pending effects.
   */
  public flushEffects(): void {
    TestBed.flushEffects();
  }

  public runInInjectionContext<T>(fn: () => T): T {
    return TestBed.runInInjectionContext(fn);
  }
}
