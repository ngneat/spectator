import { Injectable } from "@angular/core";
import { DateService } from "./date.service";

@Injectable()
export class AuthService {
  constructor(private dateService: DateService) {}

  isLoggedIn() {
    if (this.dateService.isExpired("timestamp")) {
      return false;
    }
    return true;
  }
}
