import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [
        RouterModule,
        RouterTestingModule
      ],
      providers:[
        HttpClient, HttpHandler, MatSnackBar,
        AuthGuardService,
        FormBuilder,
        NotificationService,
      ]
    });
    fixture = TestBed.createComponent(LayoutComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out', () => {
    const authGuardService = fixture.debugElement.injector.get(AuthGuardService);
    spyOn(authGuardService, 'logout');
    fixture.debugElement.query(By.css('.btn-logout')).nativeElement.click();
    fixture.detectChanges();
    expect(authGuardService.logout).toHaveBeenCalled();
  });
});
