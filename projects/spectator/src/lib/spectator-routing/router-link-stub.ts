import { Directive, HostListener, Input, NgModule } from '@angular/core';
import { ActivatedRoute, Params, QueryParamsHandling, RouterLink, UrlTree } from '@angular/router';

/* eslint-disable */

@Directive({
  selector: '[routerLink]',
  providers: [
    {
      provide: RouterLink,
      useExisting: RouterLinkDirectiveStub,
    },
  ],
})
export class RouterLinkDirectiveStub {
  @Input() routerLink: any;
  @Input() queryParams?: Params | null;
  @Input() fragment?: string;
  @Input() queryParamsHandling?: QueryParamsHandling | null;
  @Input() preserveFragment!: boolean;
  @Input() skipLocationChange!: boolean;
  @Input() replaceUrl!: boolean;
  @Input() state?: { [k: string]: any };
  @Input() relativeTo?: ActivatedRoute | null;

  navigatedTo: any = null;
  navigationExtras: any = null;

  @HostListener('click')
  onClick(): boolean {
    this.navigatedTo = this.routerLink;
    this.navigationExtras = {
      skipLocationChange: this.attrBoolValue(this.skipLocationChange),
      replaceUrl: this.attrBoolValue(this.replaceUrl),
      state: this.state,
    };
    return true;
  }

  private attrBoolValue(s: any): boolean {
    return s === '' || !!s;
  }
}

/*
  This is an unused module to resolve the ng build error:
    'Cannot determine the module for class RouterLinkDirectiveStub'

  Reference: https://github.com/angular/issues/13590
*/
@NgModule({
  declarations: [RouterLinkDirectiveStub],
})
export class RouterLinkDirectiveStubModule {}
