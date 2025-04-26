import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRouterComponent } from './trip-router.component';

describe('TripRouterComponent', () => {
  let component: TripRouterComponent;
  let fixture: ComponentFixture<TripRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripRouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
