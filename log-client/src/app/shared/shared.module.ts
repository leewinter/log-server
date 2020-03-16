import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WebsocketService } from './services/websocket.service';
import { LogStreamComponent } from './components/log-stream/log-stream.component';
import { environment } from '../../environments/environment';

const config: SocketIoConfig = { url: environment.logServerUrl, options: {} };

@NgModule({
  declarations: [LogStreamComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [WebsocketService],
  exports: [LogStreamComponent]
})
export class SharedModule { }
