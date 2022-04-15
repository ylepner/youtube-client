/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  returnUrl: string | undefined;
  userName: string | undefined;
  password: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthService
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async login() {
    const result = await this.service.login(
      this.userName ?? '',
      this.password ?? ''
    );
    if (result) {
      this.router.navigate(['home']);
    }
  }
}
