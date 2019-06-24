import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/** Modules */
import { MaterialModule } from './material/material.module';
import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
/** Components */
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  HomeComponent,
  SignupComponent,
  LoginComponent,
  LogoutComponent,
  AccountComponent,
  CoursesComponent,
  AdminComponent,
  NotFoundComponent
} from './pages';
/** Services */
import { UserService } from './services/user.service';
import { CourseService } from './services/course.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { environment } from './../environments/environment';

const PAGES = [
  HomeComponent,
  SignupComponent,
  LoginComponent,
  LogoutComponent,
  AccountComponent,
  CoursesComponent,
  AdminComponent,
  NotFoundComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...PAGES
  ],
  imports: [
    RoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    CourseService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
