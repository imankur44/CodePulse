import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/features/login/services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLoginComponent } from 'src/app/features/login/user-login/user-login.component';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription?: Subscription;


  constructor(private router: Router, private loginService: LoginService, private sharedService: SharedService) {
    this.isLoggedIn = this.loginService.isLoggedIn();
   }

  ngOnInit(): void {
    this.authSubscription = this.loginService.loggedIn$.subscribe(
      loggedIn => this.isLoggedIn = loggedIn
    );
  }

  logout(): void {
    this.loginService.logoutClick();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  
  register(): void {
    this.sharedService.showLoginForm(false);
    this.router.navigate(['/login']);
  }
  
}
