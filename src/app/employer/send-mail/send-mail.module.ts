import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendMailRoutingModule } from './send-mail-routing.module';
import { SendMailComponent } from './send-mail.component';


@NgModule({
  declarations: [SendMailComponent],
  imports: [
    CommonModule,
    SendMailRoutingModule
  ]
})
export class SendMailModule { }
