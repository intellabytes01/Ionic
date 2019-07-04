import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemesPage } from './schemes.page';

describe('SchemesPage', () => {
  let component: SchemesPage;
  let fixture: ComponentFixture<SchemesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
