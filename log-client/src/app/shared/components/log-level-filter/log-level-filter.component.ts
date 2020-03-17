import { Component, OnInit } from '@angular/core';
import { LogLevelService } from '../../services/log-level.service';

@Component({
  selector: 'app-log-level-filter',
  templateUrl: './log-level-filter.component.html',
  styleUrls: ['./log-level-filter.component.scss']
})
export class LogLevelFilterComponent implements OnInit {
  logLevels: string[];

  constructor(private logLevelService: LogLevelService) {
    console.log('etf')
  }

  ngOnInit(): void {
    this.logLevels = this.logLevelService.getAll();
    console.log(this.logLevels)
  }

}
