import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TopItemsService } from './top-items.service';

describe('TopItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopItemsService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([TopItemsService], (service: TopItemsService) => {
    expect(service).toBeTruthy();
  }));
});
