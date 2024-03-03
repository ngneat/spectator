import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-view-children',
  template: `
    <section>
      <app-child></app-child>
      <app-child></app-child>
      <app-child></app-child>
      <app-child></app-child>
      <div #divref>By ref</div>
      <div #divref>By ref</div>
      <button>click</button>
      <ng-content></ng-content>
    </section>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class ViewChildrenComponent implements OnInit {
  @ViewChild(ChildComponent, { static: true }) public child!: ChildComponent;
  @ViewChildren(ChildComponent) public children!: QueryList<ChildComponent>;

  public ngOnInit(): void {}
}
