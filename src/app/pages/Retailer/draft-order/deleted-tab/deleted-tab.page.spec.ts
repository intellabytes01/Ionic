import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedTabPage } from './deleted-tab.page';

describe('DeletedTabPage', () => {
  let component: DeletedTabPage;
  let fixture: ComponentFixture<DeletedTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
