import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[datoAutoFocus]',
  standalone: false,
})
export class AutoFocusDirective {
  @Input() public set datoAutoFocus(value: boolean) {
    if (value) {
      this.host.nativeElement.focus();
    }
  }

  public constructor(private readonly host: ElementRef) {}

  public method(): void {
    // eslint-disable-next-line no-console
    console.log();
  }
}
