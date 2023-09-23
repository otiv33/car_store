import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTileComponent } from './car-tile.component';

describe('CarTileComponent', () => {
  let component: CarTileComponent;
  let fixture: ComponentFixture<CarTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarTileComponent]
    });
    fixture = TestBed.createComponent(CarTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
