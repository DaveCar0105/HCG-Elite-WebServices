import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { AuthService } from '../paginas/login/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{
  isLogin: Observable<boolean>;
  isAdmin = false;
  isAgencia = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService) {
  }

  ngOnInit() {
    this.authService.login();
    this.isLogin = this.authService.isLoggedIn;
    if(localStorage.getItem('codigo')=='1'){
      this.isAdmin = true;
    }
    if(localStorage.getItem('tipo') === 'HCG'){
      this.isAgencia = true;
    }
    else{
      this.isAgencia = false;
    }

  }

  logOut(event: Event) {
    event.preventDefault();
    this.authService.logout();
    event.stopImmediatePropagation();
  }

}
