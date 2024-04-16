import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authenticationpages/login/login.component';
import { SignupComponent } from './authenticationpages/signup/signup.component';
import { UserviewComponent } from './userview/userview.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { TechnicianviewComponent } from './technicianview/technicianview.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user', component: UserviewComponent },
  { path: 'admin', component: AdminviewComponent },
  { path: 'technician', component: TechnicianviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configure RouterModule with routes
  exports: [RouterModule]
})
export class AppRoutingModule { }
