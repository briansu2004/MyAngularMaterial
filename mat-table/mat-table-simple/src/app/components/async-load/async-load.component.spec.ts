import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncLoadComponent } from './async-load.component';

describe('AsyncLoadComponent', () => {
  let component: AsyncLoadComponent;
  let fixture: ComponentFixture<AsyncLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncLoadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
