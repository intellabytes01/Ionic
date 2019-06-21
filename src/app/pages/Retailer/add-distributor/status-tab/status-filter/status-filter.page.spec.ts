import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFilterPage } from './status-filter.page';

describe('StatusFilterPage', () => {
  let component: StatusFilterPage;
  let fixture: ComponentFixture<StatusFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
