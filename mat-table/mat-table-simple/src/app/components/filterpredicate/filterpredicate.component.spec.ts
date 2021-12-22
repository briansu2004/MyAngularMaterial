import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpredicateComponent } from './filterpredicate.component';

describe('FilterpredicateComponent', () => {
  let component: FilterpredicateComponent;
  let fixture: ComponentFixture<FilterpredicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterpredicateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterpredicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
