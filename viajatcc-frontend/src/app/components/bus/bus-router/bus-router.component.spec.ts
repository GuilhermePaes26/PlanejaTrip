import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRouterComponent } from './bus-router.component';

describe('BusRouterComponent', () => {
  let component: BusRouterComponent;
  let fixture: ComponentFixture<BusRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusRouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
