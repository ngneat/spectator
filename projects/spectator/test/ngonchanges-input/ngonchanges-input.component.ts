import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button [disabled]="btnDisabled">
      {{ btnText }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgOnChangesInputComponent {
  @Input()
  btnDisabled = true;

  btnText = 'Button disabled';

  ngOnChanges() {
    this.btnText = this.btnDisabled ? 'Button disabled' : 'Button enabled';
  }
}
