import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
    ])
  ],

  exports: [RouterModule]
})
export class AuthModule { }
