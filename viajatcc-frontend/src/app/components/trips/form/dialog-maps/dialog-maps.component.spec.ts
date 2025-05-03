import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMapsComponent } from './dialog-maps.component';

describe('DialogMapsComponent', () => {
  let component: DialogMapsComponent;
  let fixture: ComponentFixture<DialogMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogMapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
