import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  public showNotification(message: string): void {
    this._snackBar.open(message, "X", {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public showErrorNotification(errorObject: any): void {
    let message = '';
    if(errorObject?.error?.message && errorObject?.error?.detail){
      message = errorObject.error.message+' ... '+errorObject.error.detail;
    }
    else if (errorObject?.message){
      message = errorObject.message;
    }
    else if(errorObject?.error){
      message = errorObject.error;
    }
    else{
      message = errorObject;
    }
    this._snackBar.open(message, "X", {
      duration: 3000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
