import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {AppRouting} from './app.routing';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {URLInterceptorService} from "./services/interceptors/url-interceptor.service";
import { HomeVideosComponent } from './home/home-videos/home-videos.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HomeCreatorComponent } from './home/home-creator/home-creator.component';
import { LoadingComponent } from './comman-components/loading/loading.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MoreViewsComponent } from './home/more-views/more-views.component';
import { RecommendedVideosComponent } from './home/recommended-videos/recommended-videos.component';
import { VistorSignupComponent } from './signup/visitor-signup/vistor-signup.component';
import { CreatorSignupComponent } from './signup/creator-signup/creator-signup.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {AlertModule, CarouselModule, ProgressbarModule, BsDropdownModule} from "ngx-bootstrap";
import { SettingsComponent } from './logged-in-components/settings/settings.component';
import {JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import {ErrorInterceptorService} from "./services/interceptors/error-interceptor.service";
import {JwtInterceptorService} from "./services/interceptors/jwt-interceptor.service";
import { ForgetPasswordComponent } from './password/forget-password/forget-password.component';
import { VerifyCodeComponent } from './password/verify-code/verify-code.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { AboutCreatorComponent } from './video-details/about-creator/about-creator.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import {MoreViewsDetailsComponent} from "./comman-components/more-views-details/more-views-details.component";
import { CreatorDetailsComponent } from './creator-details/creator-details.component';
import { CreatorVideosComponent } from './creator-details/creator-videos/creator-videos.component';
import { SideMoreViewsComponent } from './creator-details/side-more-views/side-more-views.component';
import { FavoritesComponent } from './logged-in-components/favorites/favorites.component';
import { FollowersComponent } from './logged-in-components/followers/followers.component';
import {NgxPaginationModule} from "ngx-pagination/dist/ngx-pagination";
import { RevenueComponent } from './logged-in-components/revenue/revenue.component';
import {FullCalendarModule} from "ng-fullcalendar";
import { ProfileComponent } from './logged-in-components/profile/profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {SimpleNotificationsModule} from "angular2-notifications";
import { UploadVideoComponent } from './logged-in-components/upload-video/upload-video.component';
import {TagInputModule} from "ngx-chips";
import { MyVideosComponent } from './logged-in-components/my-videos/my-videos.component';
import { EditVideoComponent } from './logged-in-components/edit-video/edit-video.component';
import { ProfileMenuComponent } from './header/profile-menu/profile-menu.component';
import {SocialLoginModule, AuthServiceConfig, FacebookLoginProvider} from "angular-6-social-login";
import {ClickOutsideModule} from "ng-click-outside";
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { StatisticsComponent } from './logged-in-components/statistics/statistics.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: ['localhost:4200', 'https://piksels-api.n-stream.tv/api/v1/portal/']
  }
};

// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("250010705400133")
      }
    ]
);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    HomeComponent,
    HomeVideosComponent,
    HomeCreatorComponent,
    LoadingComponent,
    MoreViewsComponent,
    RecommendedVideosComponent,
    VistorSignupComponent,
    CreatorSignupComponent,
    LoginComponent,
    SettingsComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
    VideoDetailsComponent,
    AboutCreatorComponent,
    CategoryDetailsComponent,
    MoreViewsDetailsComponent,
    CreatorDetailsComponent,
    CreatorVideosComponent,
    SideMoreViewsComponent,
    FavoritesComponent,
    FollowersComponent,
    RevenueComponent,
    ProfileComponent,
    UploadVideoComponent,
    MyVideosComponent,
    EditVideoComponent,
    ProfileMenuComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    NgxPaginationModule,
    FullCalendarModule,
    NgSelectModule,
    SimpleNotificationsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TagInputModule,
    ClickOutsideModule,
    SocialLoginModule,
    NgxChartsModule,
    JwtModule.forRoot(JWT_Module_Options),
    ProgressbarModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: URLInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
