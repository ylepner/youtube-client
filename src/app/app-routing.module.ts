import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { Page404Component } from './core/pages/page404/page404.component';
import { HomeComponent } from './youtube/pages/home/home.component';
import { DetailedInfoComponent } from './youtube/pages/detailed-info/detailed-info.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./youtube/youtube.module').then(m => m.YoutubeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '404',
    component: Page404Component,
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
