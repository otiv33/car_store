import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthGuardService,
    private formBuilder: FormBuilder,
    private router: Router
  ){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      if (this.loginForm.value.username === 'user' && this.loginForm.value.password === 'password') {
        this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
