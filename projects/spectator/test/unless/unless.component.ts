import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]' })
export class AppUnlessDirective {
  constructor(private readonly templateRef: TemplateRef<any>, private readonly viewContainer: ViewContainerRef) {}

  @Input() public set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
