import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyoutstandingTabPage } from './myoutstanding-tab.page';

describe('MyoutstandingTabPage', () => {
  let component: MyoutstandingTabPage;
  let fixture: ComponentFixture<MyoutstandingTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyoutstandingTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyoutstandingTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
