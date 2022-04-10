import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './pages/page404/page404.component';
import { HeaderComponent } from './components/header/header.component';
import { FilteringBlockComponent } from './components/filtering-block/filtering-block.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [Page404Component, HeaderComponent, FilteringBlockComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [HeaderComponent],
})
export class CoreModule { }
