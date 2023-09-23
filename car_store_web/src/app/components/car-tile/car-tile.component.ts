import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-tile',
  templateUrl: './car-tile.component.html',
  styleUrls: ['./car-tile.component.scss']
})
export class CarTileComponent {
  @Input() car: Car | undefined;

}
