import { Directive, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

// tslint:disable

@Directive({
  selector: '[routerLink]',
  providers: [
    {
      provide: RouterLink,
      useExisting: RouterLinkDirectiveStub
    }
  ]
})
export class RouterLinkDirectiveStub {
  @Input() routerLink: any;

  navigatedTo: any = null;

  @HostListener('click')
  onClick(): boolean {
    this.navigatedTo = this.routerLink;

    return true;
  }
}
