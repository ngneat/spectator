import { ReactiveFormsModule } from '@angular/forms';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { byText } from '../../src/public_api';

import { FormSelectComponent } from './form-select.component';

describe('FormSelectComponent', () => {
  let spectator: Spectator<FormSelectComponent>;

  const createComponent = createComponentFactory<FormSelectComponent>({
    component: FormSelectComponent,
    imports: [ReactiveFormsModule]
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

  it('should set the correct option on single select when passing the element', () => {
    const select = spectator.query('#test-single-select-element') as HTMLSelectElement;

    spectator.selectOption(select, spectator.query(byText('Two')) as HTMLOptionElement);

    expect((spectator.query(byText('One')) as HTMLOptionElement).selected).toBe(false);
    expect((spectator.query(byText('Two')) as HTMLOptionElement).selected).toBe(true);
    expect((spectator.query(byText('Three')) as HTMLOptionElement).selected).toBe(false);
  });

  it('should set the correct option on multi select when passing the elements', () => {
    const select = spectator.query('#test-multi-select-element') as HTMLSelectElement;
    const optionElements = [spectator.query(byText('Four')) as HTMLOptionElement, spectator.query(byText('Five')) as HTMLOptionElement];

    spectator.selectOption(select, optionElements);

    expect((spectator.query(byText('Four')) as HTMLOptionElement).selected).toBe(true);
    expect((spectator.query(byText('Five')) as HTMLOptionElement).selected).toBe(true);
    expect((spectator.query(byText('Six')) as HTMLOptionElement).selected).toBe(false);
  });
});
