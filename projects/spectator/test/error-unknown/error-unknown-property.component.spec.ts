import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { CommonModule } from '@angular/common';

import { ErrorUnknownPropertyComponent } from './error-unknown-property.component';

describe('ErrorUnknownPropertyComponent', () => {
  const createComponent = createComponentFactory({
    component: ErrorUnknownPropertyComponent,
    imports: [CommonModule],
    errorOnUnknownProperties: true,
  });

  it('should throw an error when creating the component', () => {
    expect(() => createComponent()).toThrowError();
  });

});
