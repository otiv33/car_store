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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CarDetailComponent,
    LoginComponent,
    CarTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuardService, CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
