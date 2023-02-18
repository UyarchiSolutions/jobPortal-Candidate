import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditJobpostComponent } from './edit-jobpost.component';

const routes: Routes = [
  {path: '', component:EditJobpostComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditJobpostRoutingModule { }
