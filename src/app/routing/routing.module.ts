import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {ProfileComponent} from '../profile/profile.component';
import {HomeComponent} from '../home/home.component';
import {WizardComponent} from '../wizard/wizard.component';
import {IsAuthenticatedGuard} from '../is-authenticated.guard';
import {LogoutComponent} from '../logout/logout.component';
import {DetailsComponent} from '../network-config/details/details.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'wizard', component: WizardComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'logout', component: LogoutComponent, canActivate: [IsAuthenticatedGuard]},
  {path: 'config/:id', component: DetailsComponent, canActivate: [IsAuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
