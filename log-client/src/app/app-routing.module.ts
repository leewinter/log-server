import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { HistoryComponent } from './modules/history/components/history/history.component';


const routes: Routes = [
  { path: 'history', component: HistoryComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
