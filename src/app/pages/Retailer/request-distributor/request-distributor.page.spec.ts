import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDistributorPage } from './request-distributor.page';

describe('RequestDistributorPage', () => {
  let component: RequestDistributorPage;
  let fixture: ComponentFixture<RequestDistributorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDistributorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDistributorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
