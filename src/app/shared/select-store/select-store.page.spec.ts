import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStorePage } from './select-store.page';

describe('SelectStorePage', () => {
  let component: SelectStorePage;
  let fixture: ComponentFixture<SelectStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
