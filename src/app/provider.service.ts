import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  obs$ = new Subject<string>();
  constructor() {}
}
