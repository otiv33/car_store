import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  logoutVisible = true;

  constructor(
    private authGuardService: AuthGuardService,
    private router: Router ) {
      router.events.subscribe(e => {
        var url = (e as any).url;
        if(url != null){
          if (url === "/login") {
            this.logoutVisible = false;
          }else{
            this.logoutVisible = true;
          }
        }
      });
  }

  public logout(): void {
    this.authGuardService.logout();
  }
}
