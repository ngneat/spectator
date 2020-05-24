import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  public alternatingSum(input: number[]): number {
    return input.reduce((sum, x, i) => sum + Math.pow(-1, i) * x, 0);
  }

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
