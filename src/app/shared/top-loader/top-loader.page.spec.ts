import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLoaderPage } from './top-loader.page';

describe('TopLoaderPage', () => {
  let component: TopLoaderPage;
  let fixture: ComponentFixture<TopLoaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLoaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
