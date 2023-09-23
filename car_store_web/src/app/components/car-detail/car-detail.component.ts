import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/shared/services/car/car.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent {
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
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
  car: Car | null = null;

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id') as string;
    this.carService.getCar(+this.carId).subscribe({
      next: (res) => {
        this.car = res;
        this.editForm.controls['name'].setValue(this.car.name);
        this.editForm.controls['color'].setValue(this.car.color);
        this.editForm.controls['price'].setValue(this.car.price);
        this.editForm.controls['saleDate'].setValue(this.car.saleDate);
        this.editForm.controls['year'].setValue(this.car.year);
      },
      error: (e) => {
        this.notificationService.showErrorNotification(e);
      }
    });
  }

  public submit(){
    // VALIDATION
    this.editForm.controls['name'].valid;
    this.editForm.controls['name'].value;
  }
}
