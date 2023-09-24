import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './shared/services/auth-guard/auth-guard.service';
import { CarNewComponent } from './components/car-new/car-new.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: IndexComponent, canActivate: mapToCanActivate([AuthGuardService])},
  { path: 'car-detail/:id', component: CarDetailComponent, canActivate: mapToCanActivate([AuthGuardService]) },
  { path: 'car-new', component: CarNewComponent, canActivate: mapToCanActivate([AuthGuardService]) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
