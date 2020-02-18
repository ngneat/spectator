import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-form-select',
  template: `
    <select id="test-single-select">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent {
  /**
   * Empty method to spy on
   */
  public handleChange(): void {
    return;
  }
}
