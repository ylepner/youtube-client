import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedInfoComponent } from './pages/detailed-info/detailed-info.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchItemComponent } from './components/search-item/search-item.component';

@NgModule({
  declarations: [
    DetailedInfoComponent,
    SearchResultsComponent,
    SearchItemComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent },
      { path: 'detailed/:id', component: DetailedInfoComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class YoutubeModule { }
