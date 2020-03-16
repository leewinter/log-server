import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  messageQueues: any[] = [
    { queueEvent: "winston-log", queue: [], queueLength: 100, pushedQueue$: new BehaviorSubject<any[]>([]) }
  ];

  constructor(private socket: Socket) {
    this.messageQueues.forEach(event => {
      this.socket.fromEvent(event.queueEvent).pipe(
        takeUntil(this.destroy$)
      ).subscribe(msg => {
        event.queue.push(msg);
        event.pushedQueue$.next(event.queue.slice(event.queueLength * -1));
      });
    });
  }

  restrictQueueLength(queueEvent: string, queueLength: number) {
    const thisQueue = this.messageQueues.find(n => n.queueEvent === queueEvent);
    thisQueue.queueLength = queueLength;
    return thisQueue;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
