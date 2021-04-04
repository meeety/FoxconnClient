import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { AuthenticationSandbox } from './sandboxes/authentication.sandbox';
import { DataSandbox } from './sandboxes/data.sandbox';
import { AuthenticationGuardService } from './services/authentication-guard-service';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';
import { TokenService } from './services/token.service';

@NgModule({
  declarations: [
  ],
  imports: [
      HttpClientModule
  ],
  providers: [
    AuthenticationSandbox,
    AuthenticationService,
    AuthenticationGuardService,
    DataSandbox,
    DataService,
    TokenService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
  ],
exports: [
  ],
})
export class SharedModule { }
