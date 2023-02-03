import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanHomeComponent } from './can-home/can-home.component';
import { CandidateModule } from './candidate/candidate.module';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CanHomeComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CandidateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
