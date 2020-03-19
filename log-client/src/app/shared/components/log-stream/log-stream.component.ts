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
  private streamListLength: number = 12;
  moment: any = moment;
  recentLogs: WinstonLog[];
  @Input('logLevelFilter')
  set logLevelFilter(value) {
    this.socketService.filterResponse(this.socketService.restrictQueueLength("winston-log", this.streamListLength), value)
  }

  constructor(private socketService: WebsocketService) { }

  ngOnInit(): void {
    this.socketService.restrictQueueLength("winston-log", this.streamListLength).pushedQueue$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((messages: WinstonLog[]) => {
      this.highlightRecentLogs(messages);
      this.recentLogs = messages.reverse();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private highlightRecentLogs(messages: WinstonLog[]) {
    const newLogs = messages.filter(n => n.timestamp.isAfter(moment().add(-2,'seconds')) );
    console.log(newLogs)
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
