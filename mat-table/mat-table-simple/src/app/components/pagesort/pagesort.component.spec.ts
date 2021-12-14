import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesortComponent } from './pagesort.component';

describe('PagesortComponent', () => {
  let component: PagesortComponent;
  let fixture: ComponentFixture<PagesortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
