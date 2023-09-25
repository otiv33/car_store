import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatSnackBar,
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a success snackbar', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    spyOn(snackBar, 'open');
    service.showNotification('test');
    expect(snackBar.open).toHaveBeenCalled();
  });

  it('should open an error snackbar', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    spyOn(snackBar, 'open');
    service.showErrorNotification('test');
    expect(snackBar.open).toHaveBeenCalled();
  });
});
