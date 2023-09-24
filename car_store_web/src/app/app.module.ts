import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { IndexComponent } from './components/index/index.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './shared/services/auth-guard/auth-guard.service';
import { CarService } from './shared/services/car/car.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CarTileComponent } from './components/car-tile/car-tile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptorInterceptor as RequestInterceptor } from './shared/services/request-interceptor/request-interceptor.interceptor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './shared/services/notification-service/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CarNewComponent } from './components/car-new/car-new.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CarDetailComponent,
    LoginComponent,
    CarTileComponent,
    CarNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    FormsModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    MatSnackBar,
    NotificationService,
    CarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
