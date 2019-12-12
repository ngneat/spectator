import { ActivatedRoute, Event, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

import { ModuleMetadata } from '../base/initial-module';
import { initialSpectatorModule } from '../spectator/initial-module';

import { ActivatedRouteStub } from './activated-route-stub';
import { SpectatorRoutingOptions } from './options';
import { RouterLinkDirectiveStub } from './router-link-stub';
import { RouterStub } from './router-stub';

/**
 * @internal
 */
export function initialRoutingModule<S>(options: Required<SpectatorRoutingOptions<S>>): ModuleMetadata {
  const moduleMetadata = initialSpectatorModule(options);

  if (options.mockRouterLinks && options.stubsEnabled) {
    moduleMetadata.declarations.push(RouterLinkDirectiveStub);
  }

  if (options.stubsEnabled) {
    moduleMetadata.providers.push(
      options.mockProvider(RouterStub, {
        events: new Subject<Event>(),
        emitRouterEvent(event: Event): void {
          this.events.next(event);
        }
      }),
      {
        provide: Router,
        useExisting: RouterStub
      }
    );

    moduleMetadata.providers.push(
      {
        provide: ActivatedRouteStub,
        useValue: new ActivatedRouteStub({
          params: options.params,
          queryParams: options.queryParams,
          data: options.data
        })
      },
      {
        provide: ActivatedRoute,
        useExisting: ActivatedRouteStub
      }
    );
  } else {
    moduleMetadata.imports.push(RouterTestingModule.withRoutes(options.routes));
  }

  return moduleMetadata;
}
