import { TestBed, inject } from '@angular/core/testing';

import { TestFormService } from './test-form.service';

describe('TestFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestFormService]
    });
  });

  it('should be created', inject([TestFormService], (service: TestFormService) => {
    expect(service).toBeTruthy();
  }));
});
