import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CalcTextAreaComponent } from './calc-textarea.component';

describe('CalcTextAreaComponent', () => {
  let spectator: Spectator<CalcTextAreaComponent>;
  const createComponent = createComponentFactory(CalcTextAreaComponent);

  it('should be defined', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  it('should calc the value', () => {
    spectator = createComponent();
    const a = spectator.query('.a') as HTMLTextAreaElement;
    const b = spectator.query('.b') as HTMLTextAreaElement;
    spectator.typeInElement('1', a);
    spectator.typeInElement('2', b);

    expect(spectator.query('.result')).toHaveText('12');
  });
});
