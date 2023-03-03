import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateprofileRoutingModule } from './updateprofile-routing.module';
import { UpdateprofileComponent } from './updateprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [
    UpdateprofileComponent,
  ],
  imports: [
    CommonModule,
    UpdateprofileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
  ]
})
export class UpdateprofileModule { }
