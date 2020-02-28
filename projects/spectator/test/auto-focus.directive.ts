import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[datoAutoFocus]'
})
export class AutoFocusDirective {
  @Input() public set datoAutoFocus(value: boolean) {
    if (value) {
      this.host.nativeElement.focus();
    }
  }

  public constructor(private readonly host: ElementRef) {}

  public method(): void {
    // tslint:disable-next-line:no-console
    console.log();
  }
}
