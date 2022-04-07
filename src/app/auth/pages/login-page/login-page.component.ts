import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  returnUrl: string | undefined;
  userName: string | undefined;
  password: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (this.userName === 'admin' && this.password === '123') {
      localStorage.setItem('currentUser', 'foo')
      this.router.navigate([this.returnUrl])
    }
  }
}
