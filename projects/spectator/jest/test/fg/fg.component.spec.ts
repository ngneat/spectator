import { SpectatorWithHost, createHostComponentFactory } from '@netbasal/spectator/jest';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FgComponent } from '../../../test/fg/fg.component';

@Component({ selector: 'app-custom-host', template: '' })
class CustomHostComponent {
  public group = new FormGroup({
    name: new FormControl('name')
  });
}

describe('With Custom Host Component', () => {
  let host: SpectatorWithHost<FgComponent, CustomHostComponent>;

  const createHost = createHostComponentFactory({
    component: FgComponent,
    imports: [ReactiveFormsModule],
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    host = createHost(`<app-fg [group]="group"></app-fg>`);
    expect(host.component).toBeDefined();
  });
});
