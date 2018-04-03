import { AuthService } from "./auth.service";
import { createService } from "../lib/src/service";
import { DateService } from "./date.service";

describe("AuthService", () => {
  const spectator = createService({
    service: AuthService,
    mocks: [DateService]
  });

  it("should not be logged in", () => {
    let dateService = spectator.get<DateService>(DateService);
    dateService.isExpired.and.returnValue(true);
    expect(spectator.service.isLoggedIn()).toBeFalsy();
  });

  it("should be logged in", () => {
    let dateService = spectator.get<DateService>(DateService);
    dateService.isExpired.and.returnValue(false);
    expect(spectator.service.isLoggedIn()).toBeTruthy();
  });
});
