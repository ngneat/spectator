import { Router, Event } from '@angular/router';

export abstract class RouterStub extends Router {
  public abstract emitRouterEvent(event: Event): void;
}

export function isRouterStub(router: Router): router is RouterStub {
  return 'emitRouterEvent' in router;
}
