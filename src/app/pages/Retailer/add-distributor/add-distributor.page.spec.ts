import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistributorPage } from './add-distributor.page';

describe('AddDistributorPage', () => {
  let component: AddDistributorPage;
  let fixture: ComponentFixture<AddDistributorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDistributorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDistributorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
