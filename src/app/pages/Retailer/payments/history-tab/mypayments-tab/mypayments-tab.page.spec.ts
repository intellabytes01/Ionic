import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypaymentsTabPage } from './mypayments-tab.page';

describe('MypaymentsTabPage', () => {
  let component: MypaymentsTabPage;
  let fixture: ComponentFixture<MypaymentsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypaymentsTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypaymentsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
