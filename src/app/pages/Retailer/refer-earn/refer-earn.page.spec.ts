import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferEarnPage } from './refer-earn.page';

describe('ReferEarnPage', () => {
  let component: ReferEarnPage;
  let fixture: ComponentFixture<ReferEarnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferEarnPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferEarnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
