import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { WebsocketService } from './services/websocket.service';
import { LogStreamComponent } from './components/log-stream/log-stream.component';
import { environment } from '../../environments/environment';
import { LogLevelFilterComponent } from './components/log-level-filter/log-level-filter.component';
import { LogLevelService } from './services/log-level.service';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: environment.logServerUrl, options: {} };

@NgModule({
  declarations: [LogStreamComponent, LogLevelFilterComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [WebsocketService, LogLevelService],
  exports: [LogStreamComponent, LogLevelFilterComponent, MatListModule, MatGridListModule]
})
export class SharedModule { }
