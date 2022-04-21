/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

const PASSWORD_MIN_LENGTH = 8;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  returnUrl: string | undefined;
  userName: string | undefined;
  password: string | undefined;

  profileForm = new FormGroup({
    nameForm: new FormControl('', [Validators.required, Validators.email]),
    passwordForm: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      passwordDifficulty,
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthService
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async login() {
    const result = await this.service.login(
      this.profileForm.value.nameForm ?? '',
      this.profileForm.value.passwordForm ?? ''
    );
    if (result && this.profileForm.valid) {
      this.router.navigate(['home']);
    }
  }
}

const passwordDifficulty: ValidatorFn = (control: AbstractControl) => {
  const strongRegex = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'
  );

  const regexes: Array<[string, RegExp, string]> = [
    ['smallLetter', /[a-z]/, 'Password should contain small letter'],
    ['capitalLetter', /[A-Z]/, 'Password should contain capital letter'],
    ['number', /[0-9]/, 'Password should contain number'],
    [
      'symbol',
      /[!@#\$%\^&\*]/,
      'Password should contain special symbol (!@#$%^&*)',
    ],
  ];
  const regexTest = regexes.map((rule) => ({
    code: rule[0],
    result: rule[1].test(control.value),
    message: rule[2],
  }));
  const regexFilter = regexTest.filter((el) => el.result === false);
  const regexMessage = Object.fromEntries(
    regexFilter.map((el) => [el.code, el.message])
  );

  if (strongRegex.test(control.value)) {
    return null;
  }
  return regexMessage;
};
