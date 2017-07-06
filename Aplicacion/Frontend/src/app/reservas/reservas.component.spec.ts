import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasComponent } from './reservas.component';

describe('ReservasComponent', () => {
  let component: ReservasComponent;
  let fixture: ComponentFixture<ReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
