import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { FormSelectComponent } from './form-select.component';

describe('FormSelectComponent', () => {
  let spectator: Spectator<FormSelectComponent>;

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

  it('should dispatch correct number of change events', () => {
    const onChangeSpy = spyOn(spectator.component, 'handleChange');
    const select = spectator.query('#test-onchange-select') as HTMLSelectElement;

    spectator.selectOption(select, ['1', '2'], { emitEvents: true });

    expect(select).toHaveSelectedOptions(['1', '2']);
    expect(onChangeSpy).toHaveBeenCalledTimes(2);
  });

  it('should not dispatch correct number of change events', () => {
    const onChangeSpy = spyOn(spectator.component, 'handleChange');
    const select = spectator.query('#test-onchange-select') as HTMLSelectElement;

    spectator.selectOption(select, ['1', '2'], { emitEvents: false });

    expect(select).toHaveSelectedOptions(['1', '2']);
    expect(onChangeSpy).not.toHaveBeenCalledTimes(2);
  });
});
