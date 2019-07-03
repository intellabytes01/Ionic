import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTabPage } from './company-tab.page';

describe('CompanyTabPage', () => {
  let component: CompanyTabPage;
  let fixture: ComponentFixture<CompanyTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
