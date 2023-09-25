import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ENV } from 'src/environments/environment';
import { NotificationService } from '../notification-service/notification.service';
import jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthGuardService {
  private urlLogin = ENV.apiURL + '/login';

  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.isLoggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  login(username: string, password:string): void {
    const user = {
      Name: username,
      Password: password
    };
    this.http.post(this.urlLogin, user)?.subscribe({
      next: (res: any) => {
        if(res){
          localStorage.setItem('token', res.token.toString());
          this.router.navigate(['/']);
        }
      },
      error: (e) => {
        this.notificationService.showErrorNotification(e);
      },
    });
    return;
  }

  logout(): void {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }

  private isLoggedIn(): boolean {
    const token = localStorage.getItem('token') ?? '';
    const auth = this.getDecodedAccessToken(token);
    if(auth != null && token != ''){
      if( auth.exp> Date.now()/1000){
        return true;
      }else{
        localStorage.setItem('token', '');
        return false;
      }
    }else{
      localStorage.setItem('token', '');
      return false;
    }
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(err) {
      this.notificationService.showErrorNotification(err);
      return null;
    }
  }


}
