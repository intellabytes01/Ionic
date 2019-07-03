import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTabPage } from './generic-tab.page';

describe('GenericTabPage', () => {
  let component: GenericTabPage;
  let fixture: ComponentFixture<GenericTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
