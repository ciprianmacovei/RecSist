import { TestBed, inject } from '@angular/core/testing';

import { PaginationService } from './pagination.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([PaginationService], (service: PaginationService) => {
    expect(service).toBeTruthy();
  }));
});
