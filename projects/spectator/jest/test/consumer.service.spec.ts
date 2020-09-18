import { createService, mockProvider } from '@ngneat/spectator/jest';
import { Subject } from 'rxjs';

import { ConsumerService } from '../../test/consumer.service';
import { ProviderService } from '../../test/provider.service';

describe('ConsumerService', () => {
  const randomNumber = Math.random();
  const spectator = createService({
    service: ConsumerService,
    providers: [
      mockProvider(ProviderService, {
        obs$: new Subject<string>(),
        method: () => randomNumber
      })
    ]
  });

  it('should consume mocked service with properties', () => {
    const provider = spectator.inject(ProviderService);
    expect(spectator.service.lastValue).toBeUndefined();
    provider.obs$.next('hey you');
    expect(spectator.service.lastValue).toBe('hey you');
  });

  it('should consume mocked service methods', () => {
    expect(spectator.service.consumeProvider()).toBe(randomNumber);
  });
});
