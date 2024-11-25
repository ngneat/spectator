import { Pipe, PipeTransform } from '@angular/core';

import { StatsService } from './stats.service';

@Pipe({
  name: 'sum',
  standalone: false,
})
export class SumPipe implements PipeTransform {
  constructor(private readonly statsService: StatsService) {}

  public transform(value: number[]): number {
    return this.statsService.sum(value);
  }
}
