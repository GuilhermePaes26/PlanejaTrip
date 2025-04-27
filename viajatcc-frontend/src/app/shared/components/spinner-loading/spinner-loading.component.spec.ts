import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerLoadingComponent } from './spinner-loading.component';

describe('SpinnerLoadingComponent', () => {
  let component: SpinnerLoadingComponent;
  let fixture: ComponentFixture<SpinnerLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
