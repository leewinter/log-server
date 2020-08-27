import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './components/history/history.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HistoryModule { }
