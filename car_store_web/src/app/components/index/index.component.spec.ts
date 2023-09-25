import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { CarService } from 'src/app/shared/services/car/car.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CarTileComponent } from '../car-tile/car-tile.component';
import { MatIconModule } from '@angular/material/icon';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  let testCarList = [
    {
      id: 1,
      name: 'Car1',
      year: 2020,
      color: 'black',
      price: 10000,
      saleDate: new Date(),
    },
    {
      id: 2,
      name: 'Car2',
      year: 2020,
      color: 'black',
      price: 10000,
      saleDate: new Date(),
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexComponent, CarTileComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatIconModule
      ],
      providers: [
        HttpClient, HttpHandler, MatSnackBar,
        CarService,
        { provide: Router, useValue: mockRouter },
        NotificationService
      ]
    });
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pageSize cookie is set', () => {
    expect(localStorage.getItem('pageSize')).toBeTruthy();
  })

  it('should get cars', () => {
    component.carList = testCarList;
    fixture.detectChanges();
    const carTiles = fixture.debugElement.queryAll(By.css('app-car-tile'));
    expect(carTiles).toBeTruthy();
    expect(carTiles.length).toBe(testCarList.length);
  });

  it('pageSize change', () => {
    spyOn(component, 'getCars');
    component.pageSizeListChange({ value: 3 });
    expect(component.getCars).toHaveBeenCalled();
    expect(component.pageSize).toBe(3);
    expect(localStorage.getItem('pageSize')).toBe('3');
    expect(component.pageNumber).toBe(1);
    expect(component.carList.length).toBe(0);

    component.carList = testCarList;
    component.carList.push({
      id: 3,
      name: 'Car3',
      year: 2020,
      color: 'black',
      price: 10000,
      saleDate: new Date(),
    });
    fixture.detectChanges();
    const carTiles = fixture.debugElement.queryAll(By.css('app-car-tile'));
    expect(carTiles).toBeTruthy();
    expect(carTiles.length).toBe(component.carList.length);
  });

  it('remove car from list', () => {
    component.carList = testCarList;
    component.carList.push({
      id: 3,
      name: 'Car3',
      year: 2020,
      color: 'black',
      price: 10000,
      saleDate: new Date(),
    });
    fixture.detectChanges();
    let carTiles = fixture.debugElement.queryAll(By.css('app-car-tile'));
    expect(carTiles).toBeTruthy();
    expect(carTiles.length).toBe(component.carList.length);
    component.removeCarFromList(testCarList[0]);
    fixture.detectChanges();
    carTiles = fixture.debugElement.queryAll(By.css('app-car-tile'));
    expect(carTiles).toBeTruthy();
    expect(carTiles.length).toBe(component.carList.length);
  });

  it('load more', () => {
    spyOn(component, 'getCars');
    component.loadMore();
    expect(component.getCars).toHaveBeenCalled();
    expect(component.pageNumber).toBe(2);
  });

  it('add car', () => {
    component.addCar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['car-new']);
  });
});
