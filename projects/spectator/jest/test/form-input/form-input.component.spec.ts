import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createHostFactory, SpectatorHost, Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { FormInputComponent } from '../../../test/form-input/form-input.component';

describe('FormInputComponent', () => {
  let host: SpectatorHost<FormInputComponent>;
  const createHost = createHostFactory({
    component: FormInputComponent,
    imports: [ReactiveFormsModule],
  });
  const group = new FormGroup({ name: new FormControl('') });

  it('should be defined', () => {
    host = createHost(`<app-form-input [enableSubnet]="true"></app-form-input>`, {
      detectChanges: true,
      props: {
        subnetControl: group,
      },
    });

    expect(host.component).toBeDefined();
    expect(host.query('p')).not.toBeNull();
    host.setInput('enableSubnet', false);
    expect(host.query('p')).toBeNull();
  });
});

describe('FormInputComponent', () => {
  let spectator: Spectator<FormInputComponent>;
  const group = new FormGroup({ name: new FormControl('') });

  const inputs = {
    subnetControl: group,
    enableSubnet: true,
  };

  const createComponent = createComponentFactory({
    component: FormInputComponent,
    imports: [ReactiveFormsModule],
  });

  beforeEach(
    () =>
      (spectator = createComponent({
        props: inputs,
      }))
  );

  it('should work', () => {
    expect(spectator.component).toBeDefined();
    expect(spectator.query('p')).not.toBeNull();
    spectator.setInput('enableSubnet', false);
    expect(spectator.query('p')).toBeNull();
  });
});
