import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-example';
  message = '';
  error_message = '';

  private pollingInterval = 5000; // ポーリングする間隔（ミリ秒）

  constructor(private apiService: ApiService) { 
    console.log('AppComponent constructor');
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit');
    this.message = 'Loading...';
    this.apiService.getMessage().subscribe((data) => {
      console.log(
        data
      );
      this.message = data.message;
      this.message = 'a...';
    });
    this.apiService.startPolling().subscribe({
      next(position) {
        console.log('Current Position: ', position);
        
      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
        window.alert('Error Getting Location: ' + msg);
      }
    });
  }
}
