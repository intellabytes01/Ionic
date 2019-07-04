import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftOrderPage } from './draft-order.page';

describe('DraftOrderPage', () => {
  let component: DraftOrderPage;
  let fixture: ComponentFixture<DraftOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
