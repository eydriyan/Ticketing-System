import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginuserComponent } from './authenticationpages/loginuser/loginuser.component';
import { LogintechnicianComponent } from './authenticationpages/logintechnician/logintechnician.component';
import { SignupComponent } from './authenticationpages/signup/signup.component';
import { UserviewComponent } from './userview/userview.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { TechnicianviewComponent } from './technicianview/technicianview.component';

const routes: Routes = [
  { path: '', component: LoginuserComponent },
  { path: 'logintechnician', component: LogintechnicianComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'user', component: UserviewComponent },
  { path: 'admin', component: AdminviewComponent },
  { path: 'technician', component: TechnicianviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
