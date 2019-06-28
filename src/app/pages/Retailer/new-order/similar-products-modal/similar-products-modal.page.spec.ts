import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarProductsModalPage } from './similar-products-modal.page';

describe('SimilarProductsModalPage', () => {
  let component: SimilarProductsModalPage;
  let fixture: ComponentFixture<SimilarProductsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarProductsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarProductsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
