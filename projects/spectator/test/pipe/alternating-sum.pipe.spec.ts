import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { AlternatingSumPipe } from './alternating-sum.pipe';
import { StatsService } from './stats.service';

describe('AlternatingSumPipe', () => {
  let spectator: SpectatorPipe<AlternatingSumPipe>;
  const createPipe = createPipeFactory({
    pipe: AlternatingSumPipe,
    template: `{{ prop | alternatingSum }}`,
  });

  it('should compute the alternating sum of a given list of numbers (prop)', () => {
    spectator = createPipe({
      hostProps: {
        prop: [1, 2, 3],
      },
    });
    expect(spectator.element).toHaveText('2');
  });

  it('should compute the alternating sum of a given list of numbers (template override)', () => {
    spectator = createPipe(`{{ [3, 4, 5] | alternatingSum }}`);
    expect(spectator.element).toHaveText('4');
  });

  it('should delegate the computation to the service', () => {
    const alternatingSum = () => 42;
    const provider = { provide: StatsService, useValue: { alternatingSum } };
    spectator = createPipe({
      hostProps: {
        prop: [],
      },
      providers: [provider],
    });
    expect(spectator.element).toHaveText('42');
  });
});
