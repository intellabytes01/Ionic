import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFilterModalPage } from './order-filter-modal.page';

describe('OrderFilterModalPage', () => {
  let component: OrderFilterModalPage;
  let fixture: ComponentFixture<OrderFilterModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFilterModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFilterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
