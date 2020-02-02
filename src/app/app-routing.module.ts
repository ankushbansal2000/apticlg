import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]
  }, 
   {
     path: 'registration', loadChildren: './registration/registration.module#RegistrationModule'
     },
  {
     path: 'login', loadChildren: './login/login.module#LoginModule' 
    },
    {
      path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordModule' 
     }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
