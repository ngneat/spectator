import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';

import { SetInputComponent } from './set-input.component';

describe('SetInputComponent', () => {
  let spectator: Spectator<SetInputComponent>;

  const createComponent = createComponentFactory({
    component: SetInputComponent,
    imports: [CommonModule]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should be update input from object', () => {
    spectator.setInput({ one: '1' });

    expect(spectator.component.one).toBe('1');
  });

  it('should be update input from 2 arguments', () => {
    spectator.setInput('one', '1');

    expect(spectator.component.one).toBe('1');
  });

  it('should be update input via 2 arguments with undefined', () => {
    spectator.setInput('one', undefined);

    expect(spectator.component.one).toBeUndefined();
  });

  it('should be update input setter', () => {
    spectator.setInput('two', '2');

    expect(spectator.component.another).toBe('2');
  });

  it('should be update input setter with undefined', () => {
    spectator.setInput('two', undefined);

    expect(spectator.component.another).toBeUndefined();
  });

  it('should be update input setter to undefined after some value', () => {
    spectator.setInput('two', 'two');

    expect(spectator.component.another).toBe('two');

    spectator.setInput('two', undefined);

    expect(spectator.component.another).toBeUndefined();
  });
});
