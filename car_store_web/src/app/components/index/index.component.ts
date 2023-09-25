import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/shared/services/car/car.service';
import { NotificationService } from 'src/app/shared/services/notification-service/notification.service';

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
  pageSizeList: number[] = [3, 5, 10];

  constructor(
    private carService: CarService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    // Get pageSize
    const _pageSize = localStorage.getItem('pageSize');
    if(_pageSize == '' || _pageSize == null){
      this.pageSize = 3;
      localStorage.setItem('pageSize', '3');
    }else{
      this.pageSize = parseInt(_pageSize);
    }
    this.getCars();
  }

  public getCars(){
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
    localStorage.setItem('pageSize', this.pageSize.toString());
    this.pageNumber = 1;
    this.carList = [];
    this.getCars();
  }

  public removeCarFromList(car: Car){
    this.carList = this.carList.filter(x => x.id != car.id);
  }

  public addCar(){
    this.router.navigate(['car-new']);
  }

}
