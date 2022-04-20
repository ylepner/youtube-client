import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(
    private router: Router,
    private service: AuthService) {
    this.logout()
  }

  async logout() {
    await this.service.logOut();
    this.router.navigate(['auth/login']);
  }

}
