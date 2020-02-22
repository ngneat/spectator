import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
  let spectator: SpectatorPipe<TranslatePipe>;
  const createPipe = createPipeFactory({
    pipe: TranslatePipe,
    mocks: [TranslateService]
  });

  beforeEach(() => {
    spectator = createPipe(`<div>{{'Hello' | translate}}</div>`, {
      detectChanges: false
    });

    const translateService = spectator.inject(TranslateService);
    translateService.transform.andReturn('Hallo');
  });

  it('should work with template', () => {
    spectator.detectChanges();
    expect(spectator.element).toHaveText('Hallo');
  });
});
