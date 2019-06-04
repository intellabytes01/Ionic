import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDistributorPage } from './status-distributor.page';

describe('StatusDistributorPage', () => {
  let component: StatusDistributorPage;
  let fixture: ComponentFixture<StatusDistributorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusDistributorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDistributorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
