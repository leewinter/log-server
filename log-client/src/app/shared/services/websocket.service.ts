import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventQueue, WinstonLog, ConnectedApi } from '../models/event-queue';

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
    { queueEvent: "get-connected-apis", queue: [], queueLength: 100, pushedQueue$: new BehaviorSubject<ConnectedApi[]>([]) }
  ];
  logLevels: string[] = [];
  connectedApis: string[] = [];

  constructor(private socket: Socket) {
    this.messageQueues.forEach(event => {
      this.socket.fromEvent(event.queueEvent).pipe(
        takeUntil(this.destroy$)
      ).subscribe((msg: object | WinstonLog) => {
        this.pushWithLimit(event, this.mapQueueEvent(msg));
        this.filterAndPush(event)
      });
    });
  }

  restrictQueueLength(queueEvent: string, queueLength: number): EventQueue {
    const thisQueue = this.messageQueues.find(n => n.queueEvent === queueEvent);
    thisQueue.queueLength = queueLength;
    return thisQueue;
  }

  filterResponseViaLogLevels(queue: EventQueue, logLevels: string[]) {
    this.logLevels = logLevels;
    this.filterAndPush(queue);
    return queue;
  }

  filterResponseViaConnectedApis(queue: EventQueue, connectedApis: string[]) {    
    this.connectedApis = connectedApis;
    this.filterAndPush(queue);
    return queue;
  }

  emit(eventName: string, msg: any) {
    this.socket.emit(eventName, msg);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private filterAndPush(eventQueue: EventQueue) {
    let filteredLogs = eventQueue.queue.filter(n => {
      // Only filter log message queues
      if (n instanceof WinstonLog) {
        let logLevelMatch = false;
        let connectedApiMatch = false;
        if (this.logLevels.length) {
          logLevelMatch = this.logLevels.includes(n.level);
        }
        if (this.connectedApis.length) {
          connectedApiMatch = this.connectedApis.includes(n.sourceApi);
        }
        
        return logLevelMatch && connectedApiMatch;
      } else {
        return true;
      }
    }).slice(eventQueue.queueLength * -1)

    eventQueue.pushedQueue$.next(filteredLogs);
  }

  private mapQueueEvent(event: any) {
    let message = event;
    if (event instanceof WinstonLog) {
      message = new WinstonLog(event);
    } else if (event instanceof ConnectedApi) {
      message = new ConnectedApi(event);
    }
    return message;
  }

  private pushWithLimit(event: EventQueue, msg: any) {
    // Handle arrays or single objects
    if (Array.isArray(msg)) {
      event.queue = event.queue.concat(msg);
    } else {
      event.queue.push(msg);
    }

    event.queue = event.queue.slice(this.internalQueueLength * -1);
  }

}
