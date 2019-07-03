import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakepaymentTabPage } from './makepayment-tab.page';

describe('MakepaymentTabPage', () => {
  let component: MakepaymentTabPage;
  let fixture: ComponentFixture<MakepaymentTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakepaymentTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakepaymentTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
