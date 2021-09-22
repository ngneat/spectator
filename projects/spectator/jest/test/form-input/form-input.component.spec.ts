import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { createHostFactory, SpectatorHost, Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { FormInputComponent } from '../../../test/form-input/form-input.component';

describe('FormInputComponent', () => {
  const group = new FormGroup({ name: new FormControl('') });

  describe('via host template', () => {
    let host: SpectatorHost<FormInputComponent>;
    const createHost = createHostFactory({
      component: FormInputComponent,
      imports: [ReactiveFormsModule]
    });

    it('should be defined', () => {
      host = createHost(`<app-form-input [enableSubnet]="enableSubnet" [subnetControl]="subnetControl"></app-form-input>`, {
        detectChanges: true,
        hostProps: {
          enableSubnet: true,
          subnetControl: group
        }
      });

      expect(host.component).toBeDefined();
      expect(host.query('p')).not.toBeNull();
      host.setHostInput({ enableSubnet: false });
      expect(host.query('p')).toBeNull();
    });
  });

  describe('without host template', () => {
    let spectator: Spectator<FormInputComponent>;

    const createComponent = createComponentFactory({
      component: FormInputComponent,
      imports: [ReactiveFormsModule]
    });

    it('should be defined', () => {
      spectator = createComponent({
        props: {
          subnetControl: group,
          enableSubnet: true
        }
      });

      expect(spectator.component).toBeDefined();
      expect(spectator.query('p')).not.toBeNull();
      spectator.setInput('enableSubnet', false);
      expect(spectator.query('p')).toBeNull();
    });
  });
});
