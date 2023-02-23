import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanGetComponent } from './can-get.component';

const routes: Routes = [
  {path:'',component:CanGetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanGetRoutingModule { }
