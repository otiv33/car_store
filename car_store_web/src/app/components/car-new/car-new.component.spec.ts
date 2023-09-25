import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNewComponent } from './car-new.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarService } from 'src/app/shared/services/car/car.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('CarNewComponent', () => {
  let component: CarNewComponent;
  let fixture: ComponentFixture<CarNewComponent>;
  let mockCarService = {
    createCar: jasmine.createSpy('createCar'),
  };
  let mockNotificationService = {
    showErrorNotification: jasmine.createSpy('showErrorNotification'),
    showNotification: jasmine.createSpy('showNotification'),
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarNewComponent],
      providers: [
        HttpClient, HttpHandler, MatSnackBar,
        { provide: CarService, useValue: mockCarService},
        Router,
        { provide: NotificationService, useValue: mockNotificationService},
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatIconModule,
      ]
    });
    fixture = TestBed.createComponent(CarNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error for invalid inputs', () => {
    fixture.debugElement.query(By.css('#submit-new')).nativeElement.click();
    fixture.detectChanges();
    expect(mockNotificationService.showErrorNotification).toHaveBeenCalled();
  });

  it('should add new car', () => {
    component.addForm.controls['name'].setValue('Test');
    component.addForm.controls['color'].setValue('Black');
    component.addForm.controls['price'].setValue('10');
    component.addForm.controls['saleDate'].setValue('2023-01-01');
    component.addForm.controls['year'].setValue('2000');
    expect(fixture.debugElement.query(By.css('[formControlName="name"]')).nativeElement.value).toEqual('Test');
    expect(fixture.debugElement.query(By.css('[formControlName="color"]')).nativeElement.value).toEqual('Black');
    expect(fixture.debugElement.query(By.css('[formControlName="price"]')).nativeElement.value).toEqual('10');
    expect(fixture.debugElement.query(By.css('[formControlName="saleDate"]')).nativeElement.value).toEqual('2023-01-01');
    expect(fixture.debugElement.query(By.css('[formControlName="year"]')).nativeElement.value).toEqual('2000');
    fixture.debugElement.query(By.css('#submit-new')).nativeElement.click();
    fixture.detectChanges();
    expect(mockCarService.createCar).toHaveBeenCalled();
  });
});
