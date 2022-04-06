import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
    ])
  ],

  exports: [RouterModule]
})
export class AuthModule { }
