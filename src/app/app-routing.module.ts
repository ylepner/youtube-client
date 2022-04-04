import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { Page404Component } from './core/pages/page404/page404.component';
import { HomeComponent } from './youtube/components/home/home.component';
import { DetailedInfoComponent } from './youtube/pages/detailed-info/detailed-info.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '404', component: Page404Component },
  { path: 'login', component: LoginPageComponent },
  { path: 'detailed', component: DetailedInfoComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
