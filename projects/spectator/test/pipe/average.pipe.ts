import { Pipe, PipeTransform } from '@angular/core';

import { StatsService } from './stats.service';

@Pipe({ name: 'avg' })
export class AveragePipe implements PipeTransform {
  constructor(private readonly statsService: StatsService) {}

  public transform(value: number[]): number {
    return this.statsService.avg(value);
  }
}
