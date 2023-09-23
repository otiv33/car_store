// auth.service.ts
import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';
import { TestBed } from '@angular/core/testing';

describe('CarService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
