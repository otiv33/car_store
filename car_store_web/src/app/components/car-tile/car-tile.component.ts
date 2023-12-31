import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import * as moment from 'moment';
import { CarService } from 'src/app/shared/services/car/car.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-car-tile',
  templateUrl: './car-tile.component.html',
  styleUrls: ['./car-tile.component.scss']
})
export class CarTileComponent {
  @Input({required: true}) car!: Car;
  @Input({required: true}) parent!: IndexComponent;
  moment = moment;

  constructor(
    private router: Router,
    private carService: CarService,
    private notificationService: NotificationService){
  }

  public editCar(){
    this.router.navigate(['/car-detail', this.car.id]);
  }

  public deleteCar(){
    this.carService.deleteCar(this.car.id).subscribe({
      next: (res) => {
        this.notificationService.showNotification("Car deleted successfully!");
        this.parent?.removeCarFromList(this.car);
      },
      error: (err) => {
        this.notificationService.showErrorNotification(err);
      }
    });
  }
}
