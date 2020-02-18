import { ReactiveFormsModule } from '@angular/forms';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { FormSelectComponent } from './form-select.component';

describe('FormSelectComponent', () => {
  let spectator: Spectator<FormSelectComponent>;

  const createComponent = createComponentFactory<FormSelectComponent>({
    component: FormSelectComponent,
    imports: [ReactiveFormsModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should set the correct option on standard select', () => {
    const select = spectator.query('#test-single-select') as HTMLSelectElement;
    spectator.selectOption(select, '1');
    expect(select).toHaveSelectedOptions('1');
  });
});
