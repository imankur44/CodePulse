import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private showLoginFormSubject = new BehaviorSubject<boolean>(true);
  showLoginForm$ = this.showLoginFormSubject.asObservable();

  showLoginForm(value: boolean): void {
    this.showLoginFormSubject.next(value);
  }
}
