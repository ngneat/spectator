---
id: testing-services
title: Testing Services 
---

The following example shows how to test a service with Spectator:

```ts
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { AuthService } from 'auth.service.ts';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory(AuthService);

  beforeEach(() => spectator = createService());

  it('should not be logged in', () => {
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });
});
```

The `createService()` function returns `SpectatorService` with the following properties:
- `service` - Get an instance of the service
- `get()` - A proxy for Angular `TestBed.get()`

### Additional Options

It's also possible to pass an object with options. For example, when testing a service
you often want to mock its dependencies, as we focus on the service being tested.

For example:
```ts
@Injectable()
export class AuthService {
  constructor( private dateService: DateService  {}

  isLoggedIn() {
    if( this.dateService.isExpired('timestamp') ) {
      return false;
    }
    return true;
  }
}
```
In this case we can mock the `DateService` dependency.
```ts
import { createServiceFactory } from '@ngneat/spectator';

import { AuthService } from 'auth.service.ts';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    providers: [],
    entryComponents: [],
    mocks: [DateService]
  });

  beforeEach(() => spectator = createService());

  it('should be logged in', () => {
    const dateService = spectator.get(DateService);
    dateService.isExpired.and.returnValue(false);

    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
```
   