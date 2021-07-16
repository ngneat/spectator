import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TranslateService } from '../translate.service';

@Component({
  selector: 'hello',
  template: `
    <div [style.width]="width" style="display: flex;">
      <h1>{{ title | translate }}</h1>
    </div>

    <div *ngIf="!widthRaw" style="color:red">widthRaw is not set</div>
    <div>Width is: {{ width }}</div>
  `,
})
export class HelloComponent implements OnChanges {
  public get width(): string | number | undefined {
    return typeof this.widthRaw === 'number' ? `${this.widthRaw}px` : this.widthRaw;
  }

  @Input() public title?: string;
  @Input() public widthRaw?: string | number;

  constructor(private readonly translate: TranslateService) {}

  public ngOnChanges(s: SimpleChanges): void {}
}
