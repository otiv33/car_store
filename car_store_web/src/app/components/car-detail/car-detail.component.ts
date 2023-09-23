import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/shared/services/car/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent {
  constructor(private route: ActivatedRoute, private carService: CarService) { }

  carId: string = '';
  car: Car | null = null;

  ngOnInit(): void {
    // Retrieve the parameter from the route
    this.carId = this.route.snapshot.paramMap.get('id') + '';
    this.carService.getCar(+this.carId).subscribe((res) => {
      this.car = res;
    });
  }
}
