import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTypesPage } from './business-types.page';

describe('BusinessTypesPage', () => {
  let component: BusinessTypesPage;
  let fixture: ComponentFixture<BusinessTypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessTypesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
