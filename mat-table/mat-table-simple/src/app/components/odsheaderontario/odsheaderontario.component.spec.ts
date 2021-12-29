import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsheaderontarioComponent } from './odsheaderontario.component';

describe('OdsheaderontarioComponent', () => {
  let component: OdsheaderontarioComponent;
  let fixture: ComponentFixture<OdsheaderontarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsheaderontarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsheaderontarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
