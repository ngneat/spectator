import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * a Subnet is a form of writing an IP Range (also known as CIDR)
 */
@Component({
  selector: 'app-form-input',
  template: `
    <div [formGroup]="subnetControl">
      <input formControlName="name" />
    </div>
    <p *ngIf="enableSubnet"></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FormInputComponent {
  @Input() public subnetControl?: FormGroup;
  @Input() public enableSubnet?: boolean;

  @Output() public readonly deleteSubnet = new EventEmitter<void>();

  public emitSubnetDelete(): void {
    this.deleteSubnet.emit();
  }
}
