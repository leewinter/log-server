import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogLevelService } from '../../services/log-level.service';
import { MatSelectionListChange } from '@angular/material/list/selection-list';

@Component({
  selector: 'app-log-level-filter',
  templateUrl: './log-level-filter.component.html',
  styleUrls: ['./log-level-filter.component.scss']
})
export class LogLevelFilterComponent implements OnInit {
  logLevels: string[];
  selectedOptions: string[];
  @Output()
  selectedLogsChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private logLevelService: LogLevelService) {
  }

  ngOnInit(): void {
    this.logLevels = this.logLevelService.getAll();
  }

  onNgModelChange(value: MatSelectionListChange) {
    this.selectedLogsChanged.emit(this.selectedOptions);
  }

}
