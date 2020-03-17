import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { WinstonLog } from '../../models/event-queue';

@Component({
  selector: 'app-log-stream',
  templateUrl: './log-stream.component.html',
  styleUrls: ['./log-stream.component.scss']
})
export class LogStreamComponent implements OnInit {
  recentLogs: WinstonLog[];
  constructor(private socketService: WebsocketService) { }

  ngOnInit(): void {
    this.socketService.restrictQueueLength("winston-log", 10).pushedQueue$.subscribe((messages: WinstonLog[]) => {
      this.recentLogs = messages;
    });
  }

}
