import { Injectable } from '@angular/core';

import { DateService } from './date.service';

@Injectable()
export class AuthService {
  constructor(private readonly dateService: DateService) {}

  public isLoggedIn(): boolean {
    return !this.dateService.isExpired('timestamp');
  }
}
