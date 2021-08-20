import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(
    private router: Router
  ) {}

  login(){
    if (localStorage.getItem("codigo")) { // {3}
      this.loggedIn.next(true);
    }
  }
  loginInicial(){
    if (localStorage.getItem("codigo")) { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/paginas']);
    }
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}