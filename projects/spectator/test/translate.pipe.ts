import { Pipe, PipeTransform } from '@angular/core';

import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  public transform(value: any, args?: any): any {
    return this.translateService.transform(value);
  }
}
