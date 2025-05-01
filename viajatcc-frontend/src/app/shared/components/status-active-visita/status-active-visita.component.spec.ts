import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusActiveVisitaComponent } from './status-active-visita.component';

describe('StatusActiveVisitaComponent', () => {
  let component: StatusActiveVisitaComponent;
  let fixture: ComponentFixture<StatusActiveVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusActiveVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusActiveVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
