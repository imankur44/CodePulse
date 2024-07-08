import { Component, OnDestroy } from '@angular/core';
import { iLoginRequest } from '../models/iLogin-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/core/components/navbar/services/shared.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent  implements OnDestroy {
  showLoginForm: boolean = true;
  showPassword: boolean = false;
  private mouseDown: boolean = false;
  model: iLoginRequest;
  private addCategorySubscription?: Subscription;

  /**
   *
   */
  constructor(private toastr: ToastrService, private router:Router, private loginService: LoginService, private sharedService: SharedService) {
    this.model = {
      id: this.generateGUID(),
      username: '',
      email: '',
      password: '',
      dateOfJoining: new Date()
    };
    this.sharedService.showLoginForm$.subscribe(value => {
      this.showLoginForm = value;
    });
  }

  generateGUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  signupClick() {
    this.loginService.signup(this.model).subscribe(response => {
      if (response && response.value && response.value.tokenString) {
        this.showMessage();
        this.toastr.success('Registered successfully!', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right' // Optional: Show close button
        });
        this.router.navigate(['/login']);
        // Redirect to a protected route or show a success message
      } else {
        // Handle login error
      }
    });
  }

  loginClick() {
    this.loginService.login(this.model).subscribe(response => {
      if (response && response.tokenString) {
        this.showMessage();
        localStorage.setItem('access_token', response.tokenString);
        this.router.navigate(['/admin/categories']);
        // Redirect to a protected route or show a success message
      } else {
        // Handle login error
      }
    });
  }

  showMessage(): void {
    this.toastr.success('Logged In successfully!', 'Success', {
      timeOut: 3000,
      positionClass: 'toast-top-right' // Optional: Show close button
    });
  }

  registerClick() {
    this.showLoginForm = false;
    this.sharedService.showLoginForm(false);
  }
  
  togglePasswordVisibility(event: MouseEvent) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
