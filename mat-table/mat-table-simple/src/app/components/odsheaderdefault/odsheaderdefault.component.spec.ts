import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsheaderdefaultComponent } from './odsheaderdefault.component';

describe('OdsheaderdefaultComponent', () => {
  let component: OdsheaderdefaultComponent;
  let fixture: ComponentFixture<OdsheaderdefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsheaderdefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsheaderdefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
