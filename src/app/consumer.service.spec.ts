import { ConsumerService } from './consumer.service';
import { createService, mockProvider } from '@netbasal/spectator';
import { ProviderService } from './provider.service';
import { Subject } from 'rxjs';

describe('ConsumerService', () => {
  const randomNumber = Math.random();
  const spectator = createService({
    service: ConsumerService,
    providers: [
      mockProvider(ProviderService, {
        obs$: new Subject(),
        method: () => randomNumber
      })
    ]
  });

  it('should consume mocked service with properties', () => {
    const provider = spectator.get(ProviderService);
    expect(spectator.service.lastValue).toBeUndefined();
    provider.obs$.next('hey you');
    expect(spectator.service.lastValue).toBe('hey you');
  });

  it('should consume mocked service methods', () => {
    expect(spectator.service.consumeProvider()).toBe(randomNumber);
  });
});
