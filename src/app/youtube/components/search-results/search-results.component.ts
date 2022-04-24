import { Component, Input } from '@angular/core';
import { CardView } from 'src/app/shared/models/custom-card';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input()
  items?: CardView[] | null;
}
