import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { AuthService } from './auth.service';
import { DateService } from './date.service';
import { DynamicComponent } from './dynamic/dynamic.component';

describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    entryComponents: [DynamicComponent],
    mocks: [DateService]
  });

  beforeEach(() => (spectator = createService()));

  it('should not be logged in', () => {
    const dateService = spectator.inject(DateService);
    dateService.isExpired.and.returnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });

  it('should be logged in', () => {
    const dateService = spectator.inject(DateService);
    dateService.isExpired.and.returnValue(false);
    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
