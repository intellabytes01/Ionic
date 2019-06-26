import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopupPage } from './modal-popup.page';

describe('ModalPopupPage', () => {
  let component: ModalPopupPage;
  let fixture: ComponentFixture<ModalPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
