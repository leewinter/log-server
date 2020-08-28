import { Component, OnInit, Input } from '@angular/core';
import { WinstonLog } from 'src/app/shared/models/event-queue';
import * as moment from 'moment';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {

  @Input() logsToDisplay: WinstonLog[];
  moment: any = moment;

  constructor() { }

  ngOnInit(): void {
  }

}
