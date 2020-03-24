import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { WebsocketService } from '../../services/websocket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { WinstonLog } from '../../models/event-queue';
import * as _ from 'lodash';
import { LogLevelService } from '../../services/log-level.service';

@Component({
  selector: 'app-log-stream-grpah',
  templateUrl: './log-stream-grpah.component.html',
  styleUrls: ['./log-stream-grpah.component.scss']
})
export class LogStreamGrpahComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  streamListLength: number = 500;
  recentLogs: WinstonLog[];
  logLevels: string[];
  public barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      text: 'Total Logs (Level x API)',
      display: false
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [{data: [], label: 'awaiting data'}];

  constructor(private socketService: WebsocketService, private logLevelService: LogLevelService) {

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.logLevels = this.logLevelService.getAll();
    this.barChartLabels = this.logLevels;
    this.socketService.restrictQueueLength("winston-log", this.streamListLength).pushedQueue$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((messages: WinstonLog[]) => {
      this.recentLogs = messages;
      if(messages.length)
      this.pushDataToGraph(this.recentLogs);
    });
  }

  dynamicColors() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.2 + ')';
  };

  createDataset = (label, type) => {
    const dataset = {
      label: label,
      data: [],
      backgroundColor: this.dynamicColors(),
      borderWidth: 1,
      opacity: 0.3
      // type: type
    };
    return dataset;
  };

  getDataset(label, type = 'bar') {
    let dataset = this.barChartData.find(data => data.label === label);
    if (dataset) {
      // Clear data as we are about to update
      dataset.data = [];
      return dataset;
    } else {
      return this.createDataset(label, type);
    }
  };

  pushDataToGraph(data) {
    const groupedByLevel = _.chain(data)
      .groupBy('level')
      .map((value, key) => ({ level: key, logs: value }))
      .value();
  
    const groupedByApi = _.chain(data)
      .groupBy('sourceApi')
      .map((value, key) => ({ sourceApi: key, logs: value }))
      .value();
  
    let graphData = [...groupedByApi.map(api => this.getDataset(`${api.sourceApi} Total`))];
    this.logLevels.forEach(logLevel => {
      const matchingMessages = groupedByLevel.find(group => group.level === logLevel);
      const logLevelTotal = matchingMessages ? matchingMessages.logs.length : 0;
  
      groupedByApi.forEach(api => {
        const matchingApiMessages = api.logs.filter(message => message.level === logLevel);
        const apiLogLevelTotal = matchingApiMessages ? matchingApiMessages.length : 0;
        graphData.find(n => n.label === `${api.sourceApi} Total`).data.push(apiLogLevelTotal);
      });
    });
  
    this.barChartData = graphData;
  };

}
