import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(userName: string, password: string) {
    if (userName === 'admin' && password === '123') {
      localStorage.setItem('currentUser', 'foo');
      return Promise.resolve('token')
    }
    return Promise.resolve(null)
  }

  logOut() {
    localStorage.clear();
  }
}
