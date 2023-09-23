import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/shared/services/car/car.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  carList: Car[] = [];
  pageSize: number = 3;
  pageNumber: number = 1;
  moreCarsToLoad: boolean = true;
  pageSizeList: number[] = [5, 10];

  constructor(
    private carService: CarService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getCars();
  }

  private getCars(){
    this.carService.getCars(this.pageSize, this.pageNumber).subscribe({
      next: (res) => {
        if(res.length == 0){
          this.moreCarsToLoad = false;
          return;
        }
        this.carList.push(...res);
      },
      error: (err) => {
        this.notificationService.showErrorNotification(err);
      }
    });
  }

  public loadMore() {
    this.pageNumber++;
    this.getCars();
  }

  public pageSizeListChange(event: any) {
    this.pageSize = event.value as number;
    this.pageNumber = 1;
    this.carList = [];
    this.getCars();
  }

  public removeCarFromList(car: Car){
    this.carList = this.carList.filter(x => x.id != car.id);
  }

}
