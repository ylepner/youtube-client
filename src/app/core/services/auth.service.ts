/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
interface User {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    const userName = localStorage.getItem('currentUser');
    if (userName) {
      this._user$.next({
        name: userName,
      });
    }
  }

  private readonly _user$ = new BehaviorSubject<User | null>(null);
  readonly isLoggedIn$ = this._user$.pipe(map((user) => !!user));
  readonly getUserName$ = this._user$.pipe(map((user) => user?.name));

  login(userName: string, password: string) {
    this._user$.next({
      name: userName,
    });
    localStorage.setItem('currentUser', userName);
    return Promise.resolve('token');
  }

  logOut() {
    localStorage.clear();
    this._user$.next(null);
  }
}
