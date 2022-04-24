/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCustomCard } from 'src/app/redux/actions/youtube.actions';

const REGEXP_URL = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 20;
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  constructor(private router: Router, private store: Store) { }

  cardForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(TITLE_MIN_LENGTH),
      Validators.maxLength(TITLE_MAX_LENGTH),
    ]),
    description: new FormControl('', [
      Validators.maxLength(DESCRIPTION_MAX_LENGTH),
    ]),
    img: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEXP_URL),
    ]),
    linkVideo: new FormControl('', [
      Validators.required,
      Validators.pattern(REGEXP_URL),
    ]),
    creationDate: new FormControl('', [Validators.required, dateValidator]),
  });

  onSubmit() {
    if (this.cardForm.valid) {
      this.store.dispatch(addCustomCard({ card: this.cardForm.value }));
      this.router.navigate(['home']);
    }
  }
}
const dateValidator: ValidatorFn = (control: AbstractControl) => {
  const dateForm = new Date(control.value);
  const today = new Date();
  if (today.getTime() - dateForm.getTime() < 0) {
    return null;
  }
  return { dateError: 'The date is invalid' };
};
