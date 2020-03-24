import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import { WebsocketService } from './services/websocket.service';
import { LogStreamComponent } from './components/log-stream/log-stream.component';
import { environment } from '../../environments/environment';
import { LogLevelFilterComponent } from './components/log-level-filter/log-level-filter.component';
import { LogLevelService } from './services/log-level.service';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConnectedApisComponent } from './components/connected-apis/connected-apis.component';
import { LogStreamGrpahComponent } from './components/log-stream-grpah/log-stream-grpah.component';

const config: SocketIoConfig = { url: environment.production ? window.location.href : environment.logServerUrl, options: {} };

@NgModule({
  declarations: [
    LogStreamComponent,
    LogLevelFilterComponent,
    ConnectedApisComponent,
    LogStreamGrpahComponent],
  imports: [
    CommonModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    ChartsModule
  ],
  providers: [
    WebsocketService,
    LogLevelService],
  exports: [
    LogStreamComponent,
    LogLevelFilterComponent,
    ConnectedApisComponent,
    LogStreamGrpahComponent,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    ChartsModule]
})
export class SharedModule { }
