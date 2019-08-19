import { Directive, HostListener, Input, NgModule } from '@angular/core';
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

/*
  This is an unused module to resolve the ng build error:
    'Cannot determine the module for class RouterLinkDirectiveStub'

  Reference: https://github.com/angular/issues/13590
*/
@NgModule({
  declarations: [RouterLinkDirectiveStub]
})
export class RouterLinkDirectiveStubModule {}
