import { Injectable } from '@angular/core';
import IUser from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) return true;
    return false;
  }

  login(userDetails: IUser): boolean {
    if (
      userDetails.email == 'admin@admin.com' &&
      userDetails.password == 'admin'
    ) {
      localStorage.setItem('token', userDetails.email);
      return true;
    }
    return false;
  }

  logout(): boolean {
    localStorage.removeItem('token');
    return true;
  }
}
