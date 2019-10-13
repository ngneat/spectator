import { By } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { createHostFactory, SpectatorWithHost, Spectator, createComponentFactory } from '@ngneat/spectator';

import { FormSelectComponent } from './form-select.component';

describe('FormSelectComponent', () => {
  let spectator: Spectator<FormSelectComponent>;
  const group = new FormGroup({ name: new FormControl('') });

  const createComponent = createComponentFactory<FormSelectComponent>({
    component: FormSelectComponent
  });

  beforeEach(() => (spectator = createComponent()));

  it('should work', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should set the correct options on multi select', () => {
    const select = spectator.query('#test-multi-select') as HTMLSelectElement;
    spectator.selectOption(select, ['1', '2']);
    expect(select).toHaveSelectedOptions(['1', '2']);
  });

  it('should set the correct options on multi select and return true with not', () => {
    const select = spectator.query('#test-multi-select') as HTMLSelectElement;
    spectator.selectOption(select, ['1', '2']);
    expect(select).not.toHaveSelectedOptions(['1', '2', '3']);
  });

  it('should set one option on multi select', () => {
    const select = spectator.query('#test-multi-select') as HTMLSelectElement;
    spectator.selectOption(select, '1');
    expect(select).toHaveSelectedOptions('1');
  });

  it('should set the correct option on standard select', () => {
    const select = spectator.query('#test-single-select') as HTMLSelectElement;
    spectator.selectOption(select, '1');
    expect(select).toHaveSelectedOptions('1');
  });
});
