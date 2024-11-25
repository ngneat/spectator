import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';

import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: 'app-consume-dynamic',
  template: ` <p>consume-dynamic works!</p> `,
  styles: [],
  standalone: false,
})
export class ConsumeDynamicComponent implements OnInit {
  constructor(
    private readonly resolver: ComponentFactoryResolver,
    private readonly ref: ViewContainerRef,
  ) {}

  public ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(DynamicComponent);
    this.ref.createComponent(factory);
  }
}
