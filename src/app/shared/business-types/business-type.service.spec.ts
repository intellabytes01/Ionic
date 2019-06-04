import { TestBed } from '@angular/core/testing';

import { BusinessTypeService } from './business-type.service';

describe('BusinessTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessTypeService = TestBed.get(BusinessTypeService);
    expect(service).toBeTruthy();
  });
});
