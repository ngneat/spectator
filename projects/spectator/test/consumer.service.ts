import { Injectable } from '@angular/core';

import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  public lastValue: any;

  constructor(private readonly provider: ProviderService) {
    provider.obs$.subscribe(val => this.update(val));
  }

  public update(val: string): void {
    this.lastValue = val;
  }

  public consumeProvider(): number {
    return this.provider.method();
  }
}
