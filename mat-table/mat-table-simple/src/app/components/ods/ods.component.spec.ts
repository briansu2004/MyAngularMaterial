import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsComponent } from './ods.component';

describe('OdsComponent', () => {
  let component: OdsComponent;
  let fixture: ComponentFixture<OdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
