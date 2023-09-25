import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/shared/services/car/car.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent {
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', Validators.required],
      saleDate: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  carId: string = '';
  car: any = null;

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id') as string;
    this.carService.getCar(+this.carId).subscribe({
      next: (res) => {
        this.car = res;
        this.editForm.controls['name'].setValue(this.car.name);
        this.editForm.controls['color'].setValue(this.car.color);
        this.editForm.controls['price'].setValue(this.car.price);
        this.editForm.controls['saleDate'].setValue(formatDate(this.car.saleDate, 'yyyy-MM-dd','en'));
        this.editForm.controls['year'].setValue(this.car.year);
      },
      error: (e) => {
        this.notificationService.showErrorNotification(e);
      }
    });
  }

  public submit(){
    // Name
    const name = this.editForm.controls['name'].value;
    if(name == '' || name == null || !this.editForm.controls['name'].valid){
      this.notificationService.showErrorNotification("Name is not valid");
      return
    }
    this.car.name = name;

    // Color
    const color = this.editForm.controls['color'].value;
    if(color == '' || color == null || !this.editForm.controls['color'].valid){
      this.notificationService.showErrorNotification("Color is not valid");
      return
    }
    this.car.color = color;

    // Price
    const price = this.editForm.controls['price'].value;
    if(price == '' || price == null || !this.editForm.controls['price'].valid ||
       isNaN(price) || price < 0)
    {
      this.notificationService.showErrorNotification("Price is not valid");
      return
    }
    this.car.price = price;

    // Sale Date, Format : yyyy-MM-dd
    const saleDate = this.editForm.controls['saleDate'].value;
    if(saleDate == '' || saleDate == null || !this.editForm.controls['saleDate'].valid ||
       isNaN(Date.parse(saleDate)))
    {
      this.notificationService.showErrorNotification("Sale date is not valid");
      return
    }
    this.car.saleDate = saleDate;
    // Year
    const year = this.editForm.controls['year'].value;
    if(year == '' || year == null || !this.editForm.controls['year'].valid ||
       isNaN(year) || year < 0)
    {
      this.notificationService.showErrorNotification("Year is not valid");
      return
    }
    this.car.year = year;

    this.carService.updateCar(this.car)?.subscribe({
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
