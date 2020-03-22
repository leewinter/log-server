import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { WebsocketService } from './services/websocket.service';
import { LogStreamComponent } from './components/log-stream/log-stream.component';
import { environment } from '../../environments/environment';
import { LogLevelFilterComponent } from './components/log-level-filter/log-level-filter.component';
import { LogLevelService } from './services/log-level.service';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConnectedApisComponent } from './components/connected-apis/connected-apis.component';

const config: SocketIoConfig = { url: environment.logServerUrl, options: {} };

@NgModule({
  declarations: [LogStreamComponent, LogLevelFilterComponent, ConnectedApisComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [WebsocketService, LogLevelService],
  exports: [LogStreamComponent, LogLevelFilterComponent, ConnectedApisComponent, FlexLayoutModule, MatListModule, MatCardModule, MatSelectModule]
})
export class SharedModule { }
