import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { StatsService } from './stats.service';
import { SumPipe } from './sum.pipe';

describe('SumPipe', () => {
  let spectator: SpectatorPipe<SumPipe>;
  const createPipe = createPipeFactory(SumPipe);

  it('should sum up the given list of numbers (template)', () => {
    spectator = createPipe(`{{ [1, 2, 3] | sum }}`);
    expect(spectator.element).toHaveText('6');
  });

  it('should sum up the given list of numbers (prop)', () => {
    spectator = createPipe(`{{ prop | sum }}`, {
      hostProps: {
        prop: [1, 2, 3]
      }
    });
    expect(spectator.element).toHaveText('6');
  });

  it('should delegate the summation to the service', () => {
    const sum = () => 42;
    const provider = { provide: StatsService, useValue: { sum } };
    spectator = createPipe(`{{ prop | sum }}`, {
      hostProps: {
        prop: [2, 40]
      },
      providers: [provider]
    });
    expect(spectator.element).toHaveText('42');
  });
});
