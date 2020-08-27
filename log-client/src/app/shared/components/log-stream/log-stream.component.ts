import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { WinstonLog } from '../../models/event-queue';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import * as moment from 'moment';

@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss']
})
export class LogStreamComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  streamListLength: number = 500;
  queueLengths: number[] = [10, 25, 50, 100, 500, 1000, 5000];
  moment: any = moment;
  recentLogs: WinstonLog[];

  _logLevelFilter: string[];
  @Input('logLevelFilter')
  set logLevelFilter(value) {
    this._logLevelFilter = value;
    this.socketService.filterResponseViaLogLevels(this.socketService.restrictQueueLength("winston-log", this.streamListLength), this._logLevelFilter);
  }
  _connectedApiFilter: string[];
  @Input('connectedApiFilter')
  set connectedApiFilter(value) {
    this._connectedApiFilter = value;
    this.socketService.filterResponseViaConnectedApis(this.socketService.restrictQueueLength("winston-log", this.streamListLength), this._connectedApiFilter);
  }

  constructor(private socketService: WebsocketService) { }

  ngOnInit(): void {
    this.socketService.restrictQueueLength("winston-log", this.streamListLength).pushedQueue$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((messages: WinstonLog[]) => {
      this.highlightRecentLogs(messages);
      this.recentLogs = messages.reverse();
    });

    this.socketService.emit('get-historic-winston-logs', { queueLength: this.streamListLength });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  queueLengthChange(value) {
    this.socketService.filterResponseViaLogLevels(this.socketService.restrictQueueLength("winston-log", this.streamListLength), this._logLevelFilter);
  }

  private highlightRecentLogs(messages: WinstonLog[]) {
    const newLogs = messages.filter(n => n.timestamp.isAfter(moment().add(-2, 'seconds')));
    messages.forEach(element => {
      if (newLogs.map(i => i.timestamp).includes(element.timestamp)) {
        element.classes.push("recently-added");
      } else {
        const index = element.classes.indexOf("recently-added", 0);
        if (index > -1) {
          element.classes.splice(index, 1);
        }
      }
    });
  }

}
