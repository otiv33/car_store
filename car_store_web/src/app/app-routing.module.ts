import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './shared/services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: IndexComponent, canActivate: mapToCanActivate([AuthGuardService])},
  { path: 'car-detail', component: CarDetailComponent, canActivate: mapToCanActivate([AuthGuardService]) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
