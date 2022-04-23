/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { YoutubeService } from 'src/app/core/services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  items$ = this.youtubeService.itemsResult$;
  constructor(private youtubeService: YoutubeService) { }
}
