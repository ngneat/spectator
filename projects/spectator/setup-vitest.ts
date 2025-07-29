import '@analogjs/vitest-angular/setup-zone';

import { getTestBed } from '@angular/core/testing';
import { defineGlobalsInjections } from '@ngneat/spectator';
import { TranslateService } from './test/translate.service';
import { TranslatePipe } from './test/translate.pipe';
import { vi } from 'vitest';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());

defineGlobalsInjections({
  providers: [TranslateService],
  declarations: [TranslatePipe],
});

beforeEach(() => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});
