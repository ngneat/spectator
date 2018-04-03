import { TestBed, inject } from "@angular/core/testing";

import { DateService } from "./date.service";

describe("DateService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateService]
    });
  });

  it(
    "should be created",
    inject([DateService], (service: DateService) => {
      expect(service).toBeTruthy();
    })
  );
});
