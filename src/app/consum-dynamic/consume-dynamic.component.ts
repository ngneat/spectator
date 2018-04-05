import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef
} from "@angular/core";
import { DynamicComponent } from "../dynamic/dynamic.component";

@Component({
  selector: "app-consume-dynamic",
  template: `
    <p>
      consume-dynamic works!
    </p>
  `,
  styles: []
})
export class ConsumeDynamicComponent implements OnInit {
  constructor(
    private resolver: ComponentFactoryResolver,
    private ref: ViewContainerRef
  ) {}

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(DynamicComponent);
    this.ref.createComponent(factory);
  }
}
