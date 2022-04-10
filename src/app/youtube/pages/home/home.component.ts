import { Component } from '@angular/core';
import { YoutubeService } from 'src/app/core/services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  items$ = this.youtubeService.itemsResult$;
  // eslint-disable-next-line no-unused-vars
  constructor(private youtubeService: YoutubeService) { }
}
