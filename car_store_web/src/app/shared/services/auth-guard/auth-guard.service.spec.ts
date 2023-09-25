// auth.service.ts
import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('CarService', () => {
  let service: AuthGuardService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient, HttpHandler, MatSnackBar,
        NotificationService,
        { provide: Router, useValue: mockRouter },
      ]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('logout should reset token', () => {
    localStorage.setItem('token', 'test');
    service.logout();
    expect(localStorage.getItem('token')).toEqual('');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('login should call http post1', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'post');
    service.login('test1', 'test1');
    expect(http.post).toHaveBeenCalled();
  });

});
