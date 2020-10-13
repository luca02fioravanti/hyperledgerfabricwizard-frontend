import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule, MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ThemingService} from './_services/theming.service';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {Server} from './_services/server';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatOptionSelected} from './mat-option-selected.directive';
import {StepperComponent} from './stepper/stepper.component';
import {CdkStepper, CdkStepperModule} from '@angular/cdk/stepper';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RoutingModule} from './routing/routing.module';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {WizardComponent} from './wizard/wizard.component';
import {NetworkComponent} from './wizard/network/network.component';
import {OrganizationsComponent} from './wizard/organizations/organizations.component';
import {OrganizationComponent} from './wizard/organization/organization.component';
import {CaComponent} from './wizard/organization/ca/ca.component';
import {ConsortiumsComponent} from './wizard/consortiums/consortiums.component';
import {SummaryComponent} from './wizard/summary/summary.component';
import {ChannelsComponent} from './wizard/channels/channels.component';
import {AuthService} from './_services/authService';
import {Interceptor} from './_services/interceptor.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {LogoutComponent} from './logout/logout.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {DetailsComponent} from './network-config/details/details.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {LoadingComponent} from './loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ShareComponent} from './network-config/details/share/share.component';
import {SharingDialogComponent} from './network-config/details/share/sharing-dialog/sharing-dialog.component';
import { SharedWithMeComponent } from './network-config/details/share/shared-with-me/shared-with-me.component';
import { DeleteDialogComponent } from './network-config/details/delete-dialog/delete-dialog.component';


const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    MatOptionSelected,
    LoginComponent,
    SignupComponent,
    ToolbarComponent,
    ProfileComponent,
    HomeComponent,
    WizardComponent,
    NetworkComponent,
    OrganizationsComponent,
    OrganizationComponent,
    CaComponent,
    ConsortiumsComponent,
    SummaryComponent,
    ChannelsComponent,
    LogoutComponent,
    DetailsComponent,
    LoadingComponent,
    ShareComponent,
    SharingDialogComponent,
    SharedWithMeComponent,
    DeleteDialogComponent
  ],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    CdkStepperModule,
    MatRippleModule,
    MatTooltipModule,
    RoutingModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    ThemingService,
    Server,
    AuthService,
    MatSnackBar,
    MatStepper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
