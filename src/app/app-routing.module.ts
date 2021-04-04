import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuardService } from './shared/services/authentication-guard-service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'data', component: DataComponent, canActivate: [AuthenticationGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
