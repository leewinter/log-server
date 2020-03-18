import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventQueue, WinstonLog } from '../models/event-queue';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private internalQueueLength: number = 500;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  messageQueues: EventQueue[] = [
    { queueEvent: "winston-log", queue: [], queueLength: 100, pushedQueue$: new BehaviorSubject<WinstonLog[]>([]) },
    { queueEvent: "api-connected", queue: [], queueLength: 100, pushedQueue$: new BehaviorSubject<object[]>([]) },
    { queueEvent: "api-disconnected", queue: [], queueLength: 100, pushedQueue$: new BehaviorSubject<object[]>([]) },
    { queueEvent: "get-connected-apis", queue: [], queueLength: 100, pushedQueue$: new BehaviorSubject<object[]>([]) }
  ];
  logLevels: string[] = [];

  constructor(private socket: Socket) {
    this.messageQueues.forEach(event => {
      this.socket.fromEvent(event.queueEvent).pipe(
        takeUntil(this.destroy$)
      ).subscribe((msg: object | WinstonLog) => {
        this.pushWithLimit(event, this.mapQueueEvent(msg));
        event.pushedQueue$.next(this.logLevels.length ? event.queue.filter(n=> this.logLevels.includes(n.level)).slice(event.queueLength * -1) : event.queue.slice(event.queueLength * -1));
      });
    });
  }

  restrictQueueLength(queueEvent: string, queueLength: number): EventQueue {
    const thisQueue = this.messageQueues.find(n => n.queueEvent === queueEvent);
    thisQueue.queueLength = queueLength;
    return thisQueue;
  }

  filterResponse(queue: EventQueue, logLevels: string[]){
    this.logLevels = logLevels;
    return queue;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }  

  private mapQueueEvent(event: any) {
    let message = event;
    if (event instanceof WinstonLog) {
      message = new WinstonLog(event)
    }
    return message;
  }

  private pushWithLimit(event: EventQueue, msg: any) {
    event.queue.push(msg);
    event.queue = event.queue.slice(this.internalQueueLength * -1);
  }

}
