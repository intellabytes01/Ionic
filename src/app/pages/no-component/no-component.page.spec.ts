import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoComponentPage } from './no-component.page';

describe('NoComponentPage', () => {
  let component: NoComponentPage;
  let fixture: ComponentFixture<NoComponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoComponentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
