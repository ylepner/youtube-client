/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const REGEXP_URL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  constructor(private router: Router) { }

  cardForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [Validators.maxLength(255)]),
    img: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEXP_URL),
    ]),
    linkVideo: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEXP_URL),
    ]),
    date: new FormControl('', [
      Validators.required,
      (control) => {
        const dateForm = new Date(control.value);
        const today = new Date();
        if (today.getTime() - dateForm.getTime() >= 0) {
          return null;
        }
        return { dateError: 'The date is invalid' };
      },
    ]),
  });

  onSubmit() {
    if (this.cardForm.valid) {
      this.router.navigate(['home']);
    }
  }
}
