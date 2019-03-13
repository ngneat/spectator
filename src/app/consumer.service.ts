import { Injectable } from '@angular/core';
import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  lastValue: any;

  constructor(private provider: ProviderService) {
    provider.obs$.subscribe(val => this.update(val));
  }

  update(val: string) {
    this.lastValue = val;
  }

  consumeProvider() {
    return this.provider.method();
  }
}
