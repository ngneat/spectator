import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  public sum(input: number[]): number {
    return input.reduce((sum, x) => sum + x, 0);
  }

  public avg(input: number[]): number {
    if (input.length === 0) {
      return 0;
    }

    return this.sum(input) / input.length;
  }
}
