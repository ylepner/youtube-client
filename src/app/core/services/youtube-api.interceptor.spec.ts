import { TestBed } from '@angular/core/testing';

import { YoutubeApiInterceptor } from './youtube-api.interceptor';

describe('YoutubeApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      YoutubeApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: YoutubeApiInterceptor = TestBed.inject(YoutubeApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
