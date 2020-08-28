import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/shared/services/history.service';
import { take, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { WinstonLog, ConnectedApi } from 'src/app/shared/models/event-queue';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  startTime: moment.Moment;
  endTime: moment.Moment;
  logs: WinstonLog[];
  logsToDisplay: WinstonLog[];
  moment: any = moment;
  selectedApis: string[];

  constructor(private historyService: HistoryService, private socketService: WebsocketService) { }

  ngOnInit(): void {
    this.startTime = moment().subtract(5, 'minutes');
    this.endTime = moment(this.startTime).add(5, 'minutes');
    this.getLogs();
  }

  startTimeChange(event: any) {
    this.startTime = moment(event.value);
    this.endTime = moment(this.startTime).add(5, 'minutes');
  }

  getLogs() {
    this.historyService.getLogDataFor(
      this.formatDate(this.startTime),
      this.formatDate(this.endTime))
      .pipe(take(1))
      .subscribe(data => {
        this.logs = data.data;
        this.filterLogs();
      })
  }

  filterLogs() {
    if (this.logs) {
      this.logsToDisplay = this.logs.filter(log => {
        return this.selectedApis.includes(log.sourceApi) ? true : false;
      }).slice();
    }
  }

  selectedApisChanged(selectedApis) {
    this.selectedApis = selectedApis;
    this.filterLogs();
  }

  formatDate(dateTime: moment.Moment): string {
    return dateTime.format('YYYY-MM-DD HH:mm:ss');
  }

}
