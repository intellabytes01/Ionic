import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorTabPage } from './distributor-tab.page';

describe('DistributorTabPage', () => {
  let component: DistributorTabPage;
  let fixture: ComponentFixture<DistributorTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
