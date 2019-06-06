import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecommenderService } from './recommender.service';

describe('RecommenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommenderService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([RecommenderService], (service: RecommenderService) => {
    expect(service).toBeTruthy();
  }));
});
