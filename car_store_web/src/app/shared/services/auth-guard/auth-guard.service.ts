import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ENV } from 'src/assets/environment';

@Injectable({providedIn: 'root'})
export class AuthGuardService {
  constructor(private router: Router,private http: HttpClient) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.isLoggedIn()){
      console.log('You are authenticated to access this page');
      return true;
    } else {
      console.log('You are not authenticated to access this page');
      this.router.navigate(['/login']);
      return false;
    }
  }


  login(username: string, password:string): void {
    const user = {
      username: username,
      password: password
    };
    this.http.post(ENV.apiURL + '/login', user).subscribe((res) => {
      // if(res['success']){
      if(true){
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });
  }

  logout(): void {
    localStorage.setItem('currentUser', '');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return user != '' && user != null;
  }


}
