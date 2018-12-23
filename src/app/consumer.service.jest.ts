import { ConsumerService } from './consumer.service';
import { createService, mockProvider } from '@netbasal/spectator/jest';
import { ProviderService } from './provider.service';
import { Subject } from 'rxjs';

describe('ConsumerService', () => {
  const spectator = createService({
    service: ConsumerService,
    providers: [
      mockProvider(ProviderService, {
        obs$: new Subject()
      })
    ]
  });

  it('should consume mocked service with properties', () => {
    const provider = spectator.get<ProviderService>(ProviderService);
    expect(spectator.service.lastValue).toBeUndefined();
    provider.obs$.next('hey you');
    expect(spectator.service.lastValue).toBe('hey you');
  });
});
