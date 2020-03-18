import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  logLevelFilter: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  selectedLogsChanged(event: string[]) {
    this.logLevelFilter = event;
  }

}
