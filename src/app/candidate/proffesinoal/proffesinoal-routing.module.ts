import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProffesinoalComponent } from './proffesinoal.component';

const routes: Routes = [
  {path:'',component:ProffesinoalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProffesinoalRoutingModule { }
