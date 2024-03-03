import { Pipe, PipeTransform } from '@angular/core';
import { overridePipes } from '../src/lib/spectator/create-factory';
import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator';

// Created only for testing purpose
@Pipe({
  name: `standalonePipe`,
  standalone: true,
  pure: false,
})
export class StandalonePipe implements PipeTransform {
  public transform(value: number[]): number[] {
    return value;
  }
}

@Pipe({
  name: `app-non-standalone-pipe`,
})
export class MockNonStandalonePipe {
  constructor() {}
}

describe('Override Pipe', () => {
  it('should throw error when override non standalone pipe', () => {
    expect(() =>
      overridePipes({
        overridePipes: [
          [
            MockNonStandalonePipe,
            {
              remove: { imports: [] },
              add: { imports: [] },
            },
          ],
        ],
      } as any),
    ).toThrowError('Can not override non standalone pipe');
  });

  describe('with Spectator', () => {
    let spectator: SpectatorPipe<StandalonePipe>;

    const createPipe = createPipeFactory({
      pipe: StandalonePipe,
      overridePipes: [
        [
          StandalonePipe,
          {
            remove: { pure: false },
            add: { pure: true },
          },
        ],
      ],
    });

    beforeEach(() => {
      spectator = createPipe(`{{ [1, 2, 3] | standalonePipe }}`);
    });

    it('should render a StandaloneWithImportsComponent', () => {
      expect(spectator).toBeTruthy();
      expect(spectator.element).toHaveText('1,2,3');
    });
  });
});
