import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { TokenService } from "../services/token.service";
import { catchError, delay, map, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable()
export class AuthenticationSandbox {
    private readonly _authenticationStatusSubject = new BehaviorSubject(false);
    private readonly _authenticationInProgressSubject = new BehaviorSubject(false);
    constructor(
        private _authService: AuthenticationService,
        private _tokenService: TokenService
    ) { }

    public loginUser(login: string, password: string): Observable<boolean> {
      this._authenticationInProgressSubject.next(true);
        return this._authService.loginUser(login, password).pipe(
            tap(result => this._tokenService.setToken(result?.token)),
            map(result => result?.token.length > 0 ? true : false),
            catchError(error => of(false)),
            delay(1000),
            tap(result => this._authenticationStatusSubject.next(result)),
            tap(() => this._authenticationInProgressSubject.next(false)),
        );
    }

    public logoutUser(): Observable<boolean> {
        this._tokenService.clearToken();
        this._authenticationStatusSubject.next(false);
        return of(true);
    }

    public userAuthenticationState(): Observable<boolean> {
        return this._authenticationStatusSubject.asObservable();
    }

    public userAuthenticationInProgress(): Observable<boolean> {
      return this._authenticationInProgressSubject.asObservable();
  }
}
