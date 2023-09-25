import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTileComponent } from './car-tile.component';
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
import { of } from 'rxjs';

describe('CarTileComponent', () => {
  let component: CarTileComponent;
  let fixture: ComponentFixture<CarTileComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockCarService = {
    deleteCar: jasmine.createSpy('deleteCar').and.returnValue(of()),
  }

  const testCar = {
    id: 1,
    name: 'Car1',
    year: 2020,
    color: 'black',
    price: 10000,
    saleDate: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarTileComponent],
      providers: [
        HttpClient, HttpHandler, MatSnackBar,
        { provide: CarService, useValue: mockCarService },
        { provide: Router, useValue: mockRouter },
        NotificationService
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatIconModule
      ]
    });
    fixture = TestBed.createComponent(CarTileComponent);
    component = fixture.componentInstance;
    component.car = testCar;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('edit car navigation', () => {
    const btn = fixture.debugElement.query(By.css('.edit-car'));
    expect(btn).toBeTruthy();
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/car-detail', component.car.id]);
  });

  it('delete car', () => {
    fixture.debugElement.query(By.css('.delete-car')).nativeElement.click();
    fixture.detectChanges();
    expect(mockCarService.deleteCar).toHaveBeenCalledWith(component.car.id);
  });
});
