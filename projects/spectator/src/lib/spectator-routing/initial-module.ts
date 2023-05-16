import { ActivatedRoute, Event, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

import { ModuleMetadata } from '../base/initial-module';
import { initialSpectatorModule } from '../spectator/initial-module';

import { ActivatedRouteStub } from './activated-route-stub';
import { SpectatorRoutingOptions } from './options';
import { RouterStub } from './router-stub';

/**
 * @internal
 */
export function initialRoutingModule<S>(options: Required<SpectatorRoutingOptions<S>>): ModuleMetadata {
  const moduleMetadata = initialSpectatorModule(options);
  const eventsSubject = new Subject<Event>();

  if (options.stubsEnabled) {
    moduleMetadata.imports.push(RouterTestingModule);
    moduleMetadata.providers.push(
      options.mockProvider(RouterStub, {
        events: eventsSubject.asObservable(),
        emitRouterEvent(event: Event): void {
          eventsSubject.next(event);
        },
        serializeUrl(): string {
          return '/';
        },
      }),
      {
        provide: Router,
        useExisting: RouterStub,
      }
    );

    moduleMetadata.providers.push(
      {
        provide: ActivatedRouteStub,
        useValue: new ActivatedRouteStub({
          params: options.params,
          queryParams: options.queryParams,
          data: options.data,
        }),
      },
      {
        provide: ActivatedRoute,
        useExisting: ActivatedRouteStub,
      }
    );
  } else {
    moduleMetadata.imports.push(RouterTestingModule.withRoutes(options.routes));
  }

  return moduleMetadata;
}
