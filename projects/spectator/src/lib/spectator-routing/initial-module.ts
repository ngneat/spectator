import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';

import { ModuleMetadata } from '../base/initial-module';
import { initialSpectatorModule } from '../spectator/initial-module';
import { SpyObject } from '../mock';

import { ActivatedRouteStub } from './activated-route-stub';
import { SpectatorRoutingOptions } from './options';
import { RouterLinkDirectiveStub } from './router-link-stub';

/**
 * @internal
 */
export function initialRoutingModule<S>(options: Required<SpectatorRoutingOptions<S>>): ModuleMetadata {
  const moduleMetadata = initialSpectatorModule(options);

  if (options.mockRouterLinks && options.stubsEnabled) {
    moduleMetadata.declarations.push(RouterLinkDirectiveStub);
  }

  if (options.stubsEnabled) {
    moduleMetadata.providers.push({
      provide: Router,
      useFactory: () => {
        const provider = options.mockProvider(Router);
        const router = provider.useFactory() as SpyObject<Router>;

        // this prevents the events property to be undefined
        router.castToWritable().events = EMPTY;

        return router;
      }
    });

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
