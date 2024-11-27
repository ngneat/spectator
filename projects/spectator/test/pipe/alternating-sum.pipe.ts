import { Pipe, PipeTransform } from '@angular/core';

import { StatsService } from './stats.service';

@Pipe({
  name: 'alternatingSum',
  standalone: false,
})
export class AlternatingSumPipe implements PipeTransform {
  constructor(private readonly statsService: StatsService) {}

  public transform(value: number[]): number {
    return this.statsService.alternatingSum(value);
  }
}
