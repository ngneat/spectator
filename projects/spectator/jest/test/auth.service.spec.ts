import { createService } from '@ngneat/spectator/jest';

import { AuthService } from '../../test/auth.service';
import { DateService } from '../../test/date.service';

describe('AuthService', () => {
  it('should ', () => {
    expect(true).toBeTruthy();
  });
  const spectator = createService({
    service: AuthService,
    mocks: [DateService]
  });
  it('should not be logged in', () => {
    const dateService = spectator.inject(DateService);
    dateService.isExpired.mockReturnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });

  it('should be logged in', () => {
    const dateService = spectator.inject(DateService);
    dateService.isExpired.mockReturnValue(false);
    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
