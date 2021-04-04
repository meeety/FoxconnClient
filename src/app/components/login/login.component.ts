import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AuthenticationSandbox } from 'src/app/shared/sandboxes/authentication.sandbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public formGroup: FormGroup;
  public hide = true;
  public userAuthenticationFailed = false;
  public userAuthenticationInProgress$: Observable<boolean>;
  private readonly _formChangedSubscription: Subscription;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authenticationSandbox: AuthenticationSandbox,
    private readonly _router: Router,
  ) {
    this.formGroup = this._formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(1)]],
      userPassword: [null, [Validators.required, Validators.minLength(3)]]
    });

    this._formChangedSubscription = this.formGroup.valueChanges.subscribe(
      () => this.userAuthenticationFailed = false
    );

    this.userAuthenticationInProgress$ = this._authenticationSandbox.userAuthenticationInProgress();
  }

  ngOnDestroy() {
    this._formChangedSubscription.unsubscribe();
  }

  onSubmit() {
    const userName = this.formGroup.get('userName')?.value;
    const userPassword = this.formGroup.get('userPassword')?.value;

    this._authenticationSandbox.loginUser(userName, userPassword).pipe(
      tap(result => this.userAuthenticationFailed = !result),
      tap(result => {
        if (result) this._router.navigate(['/data']);
      }),
      first()
    ).subscribe();
  }
}
