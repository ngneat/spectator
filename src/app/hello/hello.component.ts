import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `
    <div [style.width]="width">
      <h1>{{ title }}</h1>
    </div>

    <div *ngIf="!widthRaw" style="color:red">widthRaw is not set</div>
    <div>Width is: {{ width }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloComponent {
  @Input()
  title: string;
  @Input()
  widthRaw: string | number;

  ngOnChanges(s) {
    console.log('ngOnChanges', s);
  }
  get width() {
    return typeof this.widthRaw === 'number' ? `${this.widthRaw}px` : this.widthRaw;
  }
}
