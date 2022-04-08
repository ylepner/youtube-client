import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { SearchResultItem } from 'src/app/shared/models/search-item.model';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss']
})
export class DetailedInfoComponent implements OnDestroy {
  item: SearchResultItem | undefined;
  item$ = this.router.params.pipe(
    map((params) => params['id'] as string),
    switchMap((id) => this.service.getById(id)),
    // tap(x => console.log('3', x)),
  );
  subscription: Subscription;
  constructor(private router: ActivatedRoute, private service: YoutubeService) {
    this.subscription = this.item$.subscribe((item) => {
      this.item = item;
      console.log(this.item)
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
