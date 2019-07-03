import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaylaterTabPage } from './paylater-tab.page';

describe('PaylaterTabPage', () => {
  let component: PaylaterTabPage;
  let fixture: ComponentFixture<PaylaterTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaylaterTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaylaterTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
