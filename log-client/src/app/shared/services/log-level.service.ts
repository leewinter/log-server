import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogLevelService {
  logLevels: string[] = [
    "debug",
    "info",
    "warn",
    "error"
  ]
  constructor() { }

  getAll() {
    return this.logLevels;
  }
}
