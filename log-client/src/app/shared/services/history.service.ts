import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getLogDataFor(apiName, startTimeStamp, endTimeStamp): Observable<any> {
    let params = {
      apiName,
      startTimeStamp,
      endTimeStamp
    }
    return this.http.get(`http://localhost:3000/history/`, { params });
  }
}
