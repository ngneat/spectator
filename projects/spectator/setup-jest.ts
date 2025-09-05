import { defineGlobalsInjections } from './src/lib/globals-injections';
import { TranslatePipe } from './test/translate.pipe';
import { TranslateService } from './test/translate.service';

defineGlobalsInjections({
  providers: [TranslateService],
  declarations: [TranslatePipe],
});

beforeEach(() => {
  const mockIntersectionObserver = jest.fn<IntersectionObserver>();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});
