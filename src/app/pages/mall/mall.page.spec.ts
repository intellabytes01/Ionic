import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MallPage } from './mall.page';

describe('MallPage', () => {
  let component: MallPage;
  let fixture: ComponentFixture<MallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
