import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDetailsComponent } from './can-details.component';

const routes: Routes = [
  {path:'',component:CanDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanDetailsRoutingModule { }
