import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  public obs$ = new Subject<string>();

  public method(): number {
    return 5;
  }
}
