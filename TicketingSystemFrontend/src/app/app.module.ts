import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserviewComponent } from './userview/userview.component';
import { LoginComponent } from './authenticationpages/login/login.component';
import { SignupComponent } from './authenticationpages/signup/signup.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { TechnicianviewComponent } from './technicianview/technicianview.component';

@NgModule({
  declarations: [
    AppComponent,
    UserviewComponent,
    LoginComponent,
    SignupComponent,
    AdminviewComponent,
    TechnicianviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
