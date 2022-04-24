import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedInfoComponent } from './pages/detailed-info/detailed-info.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { AdminPageComponent } from '../core/components/admin-page/admin-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailedInfoComponent,
    SearchResultsComponent,
    SearchItemComponent,
    HomeComponent,
    AdminPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent },
      { path: 'detailed/:id', component: DetailedInfoComponent },
      { path: 'admin', component: AdminPageComponent },
      { path: '', redirectTo: 'home' },
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class YoutubeModule { }
