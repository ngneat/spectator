import { Directive, Inject, InjectionToken } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export const directiveProviderToken = new InjectionToken('DirectiveProviderToken');

@Directive({
  selector: '[directiveProvider]',
  providers: [{ provide: directiveProviderToken, useValue: 'test' }],
})
export class DirectiveProviderDirective {
  constructor(
    @Inject(directiveProviderToken) public provider: string,
    private fb: FormBuilder,
  ) {}
}
