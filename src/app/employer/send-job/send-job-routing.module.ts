import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendJobComponent } from './send-job.component';

const routes: Routes = [
  {path: '', component:SendJobComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendJobRoutingModule { }
