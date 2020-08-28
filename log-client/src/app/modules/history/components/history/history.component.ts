import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/shared/services/history.service';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  startTime: moment.Moment;
  endTime: moment.Moment;
  logsToDisplay: any[];
  moment: any = moment;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
  }

  startTimeChange(event: any) {
    this.startTime = moment(event.value);
  }
  endTimeChange(event: any) {
    this.endTime = moment(event.value);
  }

  getLogs() {
    if (this.endTime.isBefore(this.startTime)) {
      console.log('end time needs to be after start time');
      return false;
    }
    this.historyService.getLogDataFor(
      'localhost:117',
      this.formatDate(this.startTime),
      this.formatDate(this.endTime))
      .pipe(take(1))
      .subscribe(data => {
        console.log('data', data);
        this.logsToDisplay = data.data;
      })
  }

  formatDate(dateTime: moment.Moment): string {
    return dateTime.format('YYYY-MM-DD HH:mm:ss');
  }

}
