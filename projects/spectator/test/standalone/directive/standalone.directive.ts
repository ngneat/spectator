import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: `[appStandalone]`,
  standalone: true,
})
export class StandaloneDirective {
  @HostBinding()
  class = 'btn';
}
