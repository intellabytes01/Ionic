import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFilterModalPage } from './notification-filter-modal.page';

describe('NotificationFilterModalPage', () => {
  let component: NotificationFilterModalPage;
  let fixture: ComponentFixture<NotificationFilterModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationFilterModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationFilterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
