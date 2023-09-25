import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Car } from '../../../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {}

  url = ENV.apiURL + '/car';

  // Create a new car
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.url, car);
  }

  // Read a list of cars
  getCars(pageSize: number, pageNumber:number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/?pageSize=${pageSize}&pageNumber=${pageNumber}`);
  }

  // Read a single car by ID
  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.url}/${id}`);
  }

  // Update an existing car
  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.url}`, car);
  }

  // Delete a car by ID
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
