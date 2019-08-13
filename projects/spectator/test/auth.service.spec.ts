import { createService } from '@netbasal/spectator';

import { AuthService } from './auth.service';
import { DateService } from './date.service';
import { DynamicComponent } from './dynamic/dynamic.component';

describe('AuthService', () => {
  const spectator = createService({
    service: AuthService,
    entryComponents: [DynamicComponent],
    mocks: [DateService]
  });

  it('should not be logged in', () => {
    const dateService = spectator.get(DateService);
    dateService.isExpired.and.returnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });

  it('should be logged in', () => {
    const dateService = spectator.get(DateService);
    dateService.isExpired.and.returnValue(false);
    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
