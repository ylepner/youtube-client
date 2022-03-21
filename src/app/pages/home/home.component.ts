import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  count = 0;

  constructor() { }

  incrementCount() {
    this.count += 1;
  }
}
