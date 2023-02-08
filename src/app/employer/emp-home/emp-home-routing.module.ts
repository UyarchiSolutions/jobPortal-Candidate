import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpHomeComponent } from './emp-home.component';

const routes: Routes = [
  {path:'',component:EmpHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpHomeRoutingModule { }
