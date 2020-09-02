import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getLogDataFor(startTimeStamp, endTimeStamp): Observable<any> {
    let params = {
      startTimeStamp,
      endTimeStamp
    }
    return this.http.get(`${environment.logServerUrl}/history`, { params });
  }
}
