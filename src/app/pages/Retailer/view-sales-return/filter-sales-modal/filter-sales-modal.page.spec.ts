import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSalesModalPage } from './filter-sales-modal.page';

describe('FilterSalesModalPage', () => {
  let component: FilterSalesModalPage;
  let fixture: ComponentFixture<FilterSalesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSalesModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSalesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
