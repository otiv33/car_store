import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { By } from '@angular/platform-browser';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthGuardService = {
    login: jasmine.createSpy('login'),
    logout: jasmine.createSpy('logout'),
  }
  let mockNotificationService = {
    showErrorNotification: jasmine.createSpy('showErrorNotification'),
    showNotification: jasmine.createSpy('showNotification'),
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        HttpClient, HttpHandler, MatSnackBar,
        { provide: AuthGuardService, useValue: mockAuthGuardService},
        { provide: NotificationService, useValue: mockNotificationService},
        FormBuilder,
      ]});

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login', () => {
    // Error case
    fixture.debugElement.query(By.css('#login-submit')).nativeElement.click();
    fixture.detectChanges();
    expect(mockNotificationService.showErrorNotification).toHaveBeenCalled();
    // Success case
    component.loginForm.controls['username'].setValue('User');
    component.loginForm.controls['password'].setValue('123');
    expect(fixture.debugElement.query(By.css('#username')).nativeElement.value).toEqual('User');
    expect(fixture.debugElement.query(By.css('#password')).nativeElement.value).toEqual('123');
    fixture.debugElement.query(By.css('#login-submit')).nativeElement.click();
    fixture.detectChanges();
    expect(mockAuthGuardService.login).toHaveBeenCalled();
  })

  it('should call logout', () => {
    component.logout();
    expect(mockAuthGuardService.logout).toHaveBeenCalled();
  });

});
