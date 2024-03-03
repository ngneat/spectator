import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { AuthService } from '../../test/auth.service';
import { DateService } from '../../test/date.service';

describe('AuthService', () => {
  it('should ', () => {
    expect(true).toBeTruthy();
  });

  let spectator: SpectatorService<AuthService>;
  const createService = createServiceFactory({
    service: AuthService,
    mocks: [DateService],
  });

  beforeEach(() => (spectator = createService()));

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
