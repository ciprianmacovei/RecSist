import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchBarService } from './search-bar.service';

describe('SearchBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchBarService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([SearchBarService], (service: SearchBarService) => {
    expect(service).toBeTruthy();
  }));
});
