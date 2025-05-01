import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateBusComponent } from './dialog-create-bus.component';

describe('DialogCreateBusComponent', () => {
  let component: DialogCreateBusComponent;
  let fixture: ComponentFixture<DialogCreateBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
