/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LogoutComponent } from './components/logout/logout.component';
@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'logout', component: LogoutComponent }]),
  ],

  exports: [RouterModule],
})
export class AuthModule { }
