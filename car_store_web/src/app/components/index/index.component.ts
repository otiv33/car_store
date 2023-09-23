import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/shared/services/car/car.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  carList: Car[] = [];

  constructor(
    private carService: CarService,
    private router: Router) { }

  ngOnInit() {
    this.carService.getCars(1, 10).subscribe((res) => {
      this.carList = res;
    });
  }

  navigateToCarDetail(carId: number){
    this.router.navigate(['/car-detail', carId]);
  }
}
