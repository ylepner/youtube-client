/* eslint-disable no-undef */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(userName: string, password: string) {
    if (userName === 'admin' && password === '123') {
      localStorage.setItem('currentUser', 'foo');
      return Promise.resolve('token');
    }
    return Promise.resolve(null);
  }

  logOut() {
    localStorage.clear();
  }

  isLogedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
}
