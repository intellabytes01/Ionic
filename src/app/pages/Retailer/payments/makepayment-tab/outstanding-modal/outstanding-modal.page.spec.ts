import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingModalPage } from './outstanding-modal.page';

describe('OutstandingModalPage', () => {
  let component: OutstandingModalPage;
  let fixture: ComponentFixture<OutstandingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstandingModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
