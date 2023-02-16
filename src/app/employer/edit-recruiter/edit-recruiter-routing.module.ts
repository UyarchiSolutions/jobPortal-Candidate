import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRecruiterComponent } from './edit-recruiter.component';

const routes: Routes = [{
  path:'',component:EditRecruiterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRecruiterRoutingModule { }
