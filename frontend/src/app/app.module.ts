import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';

import { AppRoutingModule } from './app-routing.module';
import { AppThemeModule } from './app-theme.module';

import { ApiClientService } from './services/api-client/api-client.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { AwsCredentialsService } from './services/aws-credentials/aws-credentials.service';
import { AwsRequestSignerService } from './services/aws-request-signer/aws-request-signer.service';
import { ConfigService } from './services/config/config.service';
import { FacebookClientService } from './services/facebook-client/facebook-client.service';
import { ProgressService } from './services/progress/progress.service';
import { UrlParserService } from './services/url-parser/url-parser.service';

import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppThemeModule,
    FacebookModule.forRoot(),
    HttpModule
  ],
  providers: [
    ApiClientService,
    AuthGuard,
    AuthService,
    AwsCredentialsService,
    AwsRequestSignerService,
    ConfigService,
    FacebookClientService,
    ProgressService,
    UrlParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
