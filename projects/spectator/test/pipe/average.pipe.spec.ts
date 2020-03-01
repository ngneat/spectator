import { Component, Input } from '@angular/core';
import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { AveragePipe } from './average.pipe';
import { StatsService } from './stats.service';

@Component({
  template: `
    <div>{{ prop | avg }}</div>
  `
})
class CustomHostComponent {
  @Input() public prop: number[] = [1, 2, 3];
}

describe('AveragePipe', () => {
  let spectator: SpectatorPipe<AveragePipe>;
  const createPipe = createPipeFactory({
    pipe: AveragePipe,
    host: CustomHostComponent,
    providers: [StatsService]
  });

  it('should compute the average of a given list of numbers', () => {
    spectator = createPipe();
    expect(spectator.element).toHaveText('2');
  });

  it('should result to 0 when list of numbers is empty', () => {
    spectator = createPipe({
      hostProps: {
        prop: []
      }
    });
    expect(spectator.element).toHaveText('0');
  });

  it('should delegate the calculation to the service', () => {
    const avg = () => 42;
    const provider = { provide: StatsService, useValue: { avg } };
    spectator = createPipe({
      providers: [provider]
    });
    expect(spectator.element).toHaveText('42');
  });
});
