import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
