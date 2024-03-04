import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-form-select',
  template: `
    <select id="test-multi-select" name="test" multiple>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <select id="test-single-select">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <select id="test-onchange-select" (change)="handleChange()" multiple>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <select id="test-single-select-element">
      <option [ngValue]="{ id: 1 }">One</option>
      <option [ngValue]="{ id: 2 }">Two</option>
      <option [ngValue]="{ id: 3 }">Three</option>
    </select>
    <select id="test-multi-select-element" multiple>
      <option [ngValue]="{ id: 4 }">Four</option>
      <option [ngValue]="{ id: 5 }">Five</option>
      <option [ngValue]="{ id: 6 }">Six</option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSelectComponent {
  /**
   * Empty method to spy on
   */
  public handleChange(): void {
    return;
  }
}
