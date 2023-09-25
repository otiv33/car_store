import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';

import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Car } from 'src/app/models/car';

describe('CarService', () => {
  let service: CarService;
  let testCar: Car = {
    id: 1,
    name: 'Car1',
    year: 2020,
    color: 'black',
    price: 10000,
    saleDate: new Date(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient, HttpHandler, MatSnackBar,
        NotificationService,
      ]
    });
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get car by id', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get');
    service.getCar(1);
    expect(http.get).toHaveBeenCalled();
  });

  it('should get all cars', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get');
    service.getCars(1,1);
    expect(http.get).toHaveBeenCalled();
  });

  it('should create car', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'post');
    service.createCar(testCar);
    expect(http.post).toHaveBeenCalled();
  });

  it('should update car', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'put');
    service.updateCar(testCar);
    expect(http.put).toHaveBeenCalled();
  });

  it('should delete car', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'delete');
    service.deleteCar(1);
    expect(http.delete).toHaveBeenCalled();
  });
});
