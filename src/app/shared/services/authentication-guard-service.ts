import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationSandbox } from '../sandboxes/authentication.sandbox';

@Injectable()
export class AuthenticationGuardService implements CanActivate, OnDestroy {
  private readonly _authSubscription: Subscription;
  constructor(
    private readonly _authenticationSandbox: AuthenticationSandbox,
    private readonly _router: Router
  ) {
     this._authSubscription = this._authenticationSandbox.userAuthenticationState().pipe(
      tap(authenticated => {
        if (!authenticated) {
          this._router.navigate(['login']);
        }
      })
     ).subscribe();
  }

  ngOnDestroy() {
    this._authSubscription.unsubscribe();
  }

  canActivate(): Observable<boolean> {
    return this._authenticationSandbox.userAuthenticationState();
  }}
