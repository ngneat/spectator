import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'standalone',
  standalone: true,
})
export class StandalonePipe implements PipeTransform {
  transform(value: string) {
    return `${value} stands alone!`;
  }
}
