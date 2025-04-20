import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailComponent } from './trip-detail.component';

describe('TripDetailComponent', () => {
  let component: TripDetailComponent;
  let fixture: ComponentFixture<TripDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
