import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './components/history/history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class HistoryModule { }
