import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      SharedModule
    ],
    providers: [
      MatSnackBar
    ],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'car_store_web'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('car_store_web');
  });

  it('should contain layout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-layout')).toBeTruthy();
  });

});
