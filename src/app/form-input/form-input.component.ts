import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * a Subnet is a form of writing an IP Range (also known as CIDR)
 */
@Component({
  selector: 'app-form-input',
  template: `
  <div [formGroup]="subnetControl">
    <input formControlName="name">
  </div>
  <p *ngIf="enableSubnet"></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent {
  @Input()
  subnetControl: FormGroup;
  @Input()
  enableSubnet: boolean;

  @Output()
  deleteSubnet = new EventEmitter();

  emitSubnetDelete() {
    this.deleteSubnet.emit();
  }
}
