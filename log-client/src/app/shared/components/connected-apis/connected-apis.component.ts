import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConnectedApi } from '../../models/event-queue';
import { MatSelectionListChange } from '@angular/material/list/selection-list';

@Component({
  selector: 'app-connected-apis',
  templateUrl: './connected-apis.component.html',
  styleUrls: ['./connected-apis.component.scss']
})
export class ConnectedApisComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private streamListLength: number = 20;
  private filtersInitialised: boolean = false;
  connectedApis: ConnectedApi[];
  selectedOptions: ConnectedApi[];
  @Output()
  selectedApisChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private socketService: WebsocketService) { }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    // Get list of initially connected APIs
    this.socketService.restrictQueueLength("get-connected-apis", this.streamListLength).pushedQueue$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((apis: ConnectedApi[]) => {
      apis.forEach(n => n.humanLogsUrl = this.getLogsUrl(n));
      this.connectedApis = apis;
      this.initialiseFilter(apis);
    });
    this.socketService.emit('get-connected-apis', window.location.href);
  }

  onNgModelChange(value: MatSelectionListChange) {
    this.selectedApisChanged.emit(this.selectedOptions.map(n => n.url));
  }

  initialiseFilter(apis) {
    if (!this.filtersInitialised) {
      this.selectedOptions = apis;
      this.selectedApisChanged.emit(this.selectedOptions.map(n => n.url));
    }
  }

  getLogsUrl(api: ConnectedApi) {
    let url = api.url + (api.humanLogsUrl.startsWith('/') ? api.humanLogsUrl : `/${api.humanLogsUrl}`);
    url = url.replace('http://', '').replace('https://', '').replace('//', '/');
    return api.url.indexOf('https://') > 0 ? `https://${url}` : `http://${url}`;
  }

}
