import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailComponent } from './car-detail.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarService } from 'src/app/shared/services/car/car.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CarDetailComponent', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;
  let fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => {
          of("1");
        }
      },
    }
  };
  let mockCarService = {
    updateCar: jasmine.createSpy('updateCar'),
    getCar: jasmine.createSpy('getCar')
            .and.returnValue(of({
                id: 1,
                name: 'Test',
                color: 'Black',
                price: 10,
                saleDate: new Date('2023-01-01'),
                year: 10,
              })),
  };
  let mockNotificationService = {
    showErrorNotification: jasmine.createSpy('showErrorNotification'),
    showNotification: jasmine.createSpy('showNotification'),
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarDetailComponent],
      providers: [
        HttpClient, HttpHandler, MatSnackBar,
        { provide: CarService, useValue: mockCarService},
        Router,
        NotificationService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: NotificationService, useValue: mockNotificationService},
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatIconModule,
        RouterModule
      ]
    });
    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error for invalid inputs1', () => {
    component.editForm.controls['name'].setValue(null);
    component.editForm.controls['color'].setValue(null);
    component.editForm.controls['price'].setValue(null);
    component.editForm.controls['saleDate'].setValue(null);
    component.editForm.controls['year'].setValue(null);
    fixture.debugElement.query(By.css('#submit-edit')).nativeElement.click();
    fixture.detectChanges();
    expect(mockNotificationService.showErrorNotification).toHaveBeenCalled();
  });

  it('should edit car', () => {
    expect(fixture.debugElement.query(By.css('[formControlName="name"]')).nativeElement.value).toEqual('Test');
    expect(fixture.debugElement.query(By.css('[formControlName="color"]')).nativeElement.value).toEqual('Black');
    expect(fixture.debugElement.query(By.css('[formControlName="price"]')).nativeElement.value).toEqual('10');
    expect(fixture.debugElement.query(By.css('[formControlName="saleDate"]')).nativeElement.value).toEqual('2023-01-01');
    expect(fixture.debugElement.query(By.css('[formControlName="year"]')).nativeElement.value).toEqual('10');
    fixture.debugElement.query(By.css('#submit-edit')).nativeElement.click();
    fixture.detectChanges();
    expect(mockCarService.updateCar).toHaveBeenCalled();
  });
});
