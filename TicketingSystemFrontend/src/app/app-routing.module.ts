import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginuserComponent } from './authenticationpages/loginuser/loginuser.component';
import { SignupComponent } from './authenticationpages/signup/signup.component';
import { UserviewComponent } from './userview/userview-dashboard/userview.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { TechnicianviewComponent } from './technicianview/technicianview.component';
import { UserviewHistoryComponent } from './userview/userview-history/userview-history.component';

const routes: Routes = [
  { path: 'login', component: LoginuserComponent },
  { path: '', component: SignupComponent },
  { path: 'user', component: UserviewComponent },
  { path: 'userhistory', component: UserviewHistoryComponent},
  { path: 'admin', component: AdminviewComponent },
  { path: 'technician', component: TechnicianviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
