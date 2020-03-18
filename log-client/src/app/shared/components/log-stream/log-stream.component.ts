import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { WinstonLog } from '../../models/event-queue';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss']
})
export class LogStreamComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  recentLogs: WinstonLog[];
  @Input('logLevelFilter')
  set logLevelFilter(value) {
    console.log(value);
    this.destroy$.next(true);
    this.socketService.filterResponse(this.socketService.restrictQueueLength("winston-log", 10), value).pushedQueue$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((messages: WinstonLog[]) => {
      this.recentLogs = messages;
    });
  }

  constructor(private socketService: WebsocketService) { }

  ngOnInit(): void {
    this.socketService.restrictQueueLength("winston-log", 10).pushedQueue$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((messages: WinstonLog[]) => {
      this.recentLogs = messages;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
