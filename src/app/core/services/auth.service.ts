import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(userName: string, password: string) {
    if (userName && password) {
      localStorage.setItem('currentUser', userName);
      return Promise.resolve('token');
    }
    return Promise.resolve(null);
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getUserName() {
    return localStorage.getItem('currentUser')
  }
}
