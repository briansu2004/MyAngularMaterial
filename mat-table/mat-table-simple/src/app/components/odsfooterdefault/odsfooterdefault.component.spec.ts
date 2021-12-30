import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsfooterdefaultComponent } from './odsfooterdefault.component';

describe('OdsfooterdefaultComponent', () => {
  let component: OdsfooterdefaultComponent;
  let fixture: ComponentFixture<OdsfooterdefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsfooterdefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsfooterdefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
