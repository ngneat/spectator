---
id: jest-support  
title: Jest Support 
---

By default, Spectator uses Jasmine for creating spies. If you are using Jest as test framework instead, you can let Spectator create Jest-compatible spies.

Just import one of the following functions from `@ngneat/spectator/jest`(instead of @ngneat/spectator), and it will use Jest instead of Jasmine.
`createComponentFactory()`, `createHostFactory()`, `createServiceFactory()`, `createHttpFactory()`, `mockProvider()`.

```ts
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { AuthService } from './auth.service';
import { DateService } from './date.service';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    mocks: [DateService]
  });

  beforeEach(() => spectator = createService());

  it('should not be logged in', () => {
    const dateService = spectator.inject<DateService>(DateService);
    dateService.isExpired.mockReturnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });

  it('should be logged in', () => {
    const dateService = spectator.inject<DateService>(DateService);
    dateService.isExpired.mockReturnValue(false);
    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
```

When using the component schematic you can specify the `--jest` flag to have the Jest imports used.  In order to Jest imports the default, update `angular.json`:
```json
"schematics": {
  "@ngneat/spectator:spectator-component": {
    "jest": true
  }
}
```
