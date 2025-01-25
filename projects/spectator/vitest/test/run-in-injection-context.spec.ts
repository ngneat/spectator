import { inject, Injectable, InjectionToken, NgModule } from '@angular/core';
import { createInjectionContextFactory, SpectatorInjectionContext } from '@ngneat/spectator/vitest';

const TEST_TOKEN = new InjectionToken<string>('simple-token');

@Injectable()
export class TestService {
  flag = false;
}

@NgModule({
  providers: [TestService],
})
export class TestModule {}

const testFn = (arg: any) => {
  const token = inject(TEST_TOKEN);
  const { flag } = inject(TestService);

  return { token, flag, arg };
};

describe('Run in injection context', () => {
  describe('with Spectator', () => {
    const createContext = createInjectionContextFactory({ imports: [TestModule], providers: [{ provide: TEST_TOKEN, useValue: 'abcd' }] });

    let spectator: SpectatorInjectionContext;

    beforeEach(() => (spectator = createContext()));

    it('should execute fn in injection context', () => {
      const service = spectator.inject(TestService);
      service.flag = true;

      const result = spectator.runInInjectionContext(() => testFn(2));
      expect(result).toEqual({ token: 'abcd', flag: true, arg: 2 });
    });
  });
});
