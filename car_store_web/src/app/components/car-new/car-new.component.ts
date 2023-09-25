import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/shared/services/car/car.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.scss']
})
export class CarNewComponent {
  addForm: FormGroup;

  constructor(
    private router: Router,
    private carService: CarService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', Validators.required],
      saleDate: [formatDate(Date.now(), 'yyyy-MM-dd','en'), Validators.required],
      year: ['', Validators.required],
    });
  }

  carId: string = '';
  car: Car = new Car(0, '', 0, '', 0, new Date());

  public submit(): void{
    // Name
    const name = this.addForm.controls['name'].value;
    if(name == '' || name == null || !this.addForm.controls['name'].valid){
      this.notificationService.showErrorNotification("Name is not valid");
      return
    }
    this.car.name = name;

    // Color
    const color = this.addForm.controls['color'].value;
    if(color == '' || color == null || !this.addForm.controls['color'].valid){
      this.notificationService.showErrorNotification("Color is not valid");
      return
    }
    this.car.color = color;

    // Price
    const price = this.addForm.controls['price'].value;
    if(price == '' || price == null || !this.addForm.controls['price'].valid ||
       isNaN(price) || price < 0)
    {
      this.notificationService.showErrorNotification("Price is not valid");
      return
    }
    this.car.price = price;

    // Sale Date, Format : yyyy-MM-dd
    const saleDate = this.addForm.controls['saleDate'].value;
    if(saleDate == '' || saleDate == null || !this.addForm.controls['saleDate'].valid ||
       isNaN(Date.parse(saleDate)))
    {
      this.notificationService.showErrorNotification("Sale date is not valid");
      return
    }
    this.car.saleDate = saleDate;
    // Year
    const year = this.addForm.controls['year'].value;
    if(year == '' || year == null || !this.addForm.controls['year'].valid ||
       isNaN(year) || year < 0)
    {
      this.notificationService.showErrorNotification("Year is not valid");
      return
    }
    this.car.year = year;

    this.carService.createCar(this.car)?.subscribe({
      next: (res) => {
        this.notificationService.showNotification("Car updated successfully");
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.notificationService.showErrorNotification(e);
      }
    });
  }
}
