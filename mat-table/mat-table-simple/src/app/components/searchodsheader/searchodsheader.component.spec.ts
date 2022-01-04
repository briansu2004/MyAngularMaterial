import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchodsheaderComponent } from './searchodsheader.component';

describe('SearchodsheaderComponent', () => {
  let component: SearchodsheaderComponent;
  let fixture: ComponentFixture<SearchodsheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchodsheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchodsheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
