import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTripComponent } from './form-trip.component';

describe('FormTripComponent', () => {
  let component: FormTripComponent;
  let fixture: ComponentFixture<FormTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
