import { Component, Input } from '@angular/core';
import { VideoResultItem } from '../../../shared/models/search-item.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input()
  items?: VideoResultItem[] | null;
}
