import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private apiUrl = 'api/v1/hello'; // Web APIのURL
  private pollingInterval = 5000; // ポーリングする間隔（ミリ秒）


  constructor(private http: HttpClient) { }

  getMessage(): Observable<any> {
    return this.http.post('/api/v1/hello', {});
  }

  public startPolling(): Observable<any> {
    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.post(this.apiUrl, {}))
    );
  }
}
