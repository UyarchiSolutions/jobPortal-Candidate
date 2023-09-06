import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpMyaccountRoutingModule } from './emp-myaccount-routing.module';
import { EmpMyaccountComponent } from './emp-myaccount.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [EmpMyaccountComponent],
  imports: [
    CommonModule,
    EmpMyaccountRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARM6-Qr_hsR53GExv9Gmu9EtFTV5ZuDX4',
    }),
  ]
})
export class EmpMyaccountModule { }
