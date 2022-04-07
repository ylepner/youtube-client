import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedInfoComponent } from './pages/detailed-info/detailed-info.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    DetailedInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent },
      { path: 'detailed/:id', component: DetailedInfoComponent }
    ])
  ],
  exports: [RouterModule]
})
export class YoutubeModule { }
