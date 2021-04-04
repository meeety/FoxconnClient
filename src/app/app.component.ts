import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationSandbox } from './shared/sandboxes/authentication.sandbox';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Foxconn Client';
  userAuthenticated$: Observable<boolean>;

  constructor(
    private readonly _authenticationSandbox: AuthenticationSandbox
  ) {
    this.userAuthenticated$ = this.getUserAuthenticationState();
  }

  logout() {
    this._authenticationSandbox.logoutUser();
  }

  getUserAuthenticationState(): Observable<boolean> {
    return this._authenticationSandbox.userAuthenticationState();
  }
}
