import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserviewComponent } from './userview/userview.component'
import { LoginuserComponent } from './authenticationpages/loginuser/loginuser.component';
import { SignupComponent } from './authenticationpages/signup/signup.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { TechnicianviewComponent } from './technicianview/technicianview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LogintechnicianComponent } from './authenticationpages/logintechnician/logintechnician.component';

@NgModule({
  declarations: [
    AppComponent,
    UserviewComponent,
    LoginuserComponent,
    SignupComponent,
    AdminviewComponent,
    TechnicianviewComponent,
    LogintechnicianComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
