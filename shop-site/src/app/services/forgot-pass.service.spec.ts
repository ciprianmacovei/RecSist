import { TestBed } from '@angular/core/testing';

import { ForgotPassService } from './forgot-pass.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ForgotPassService', () => {

  
    beforeEach(() => TestBed.configureTestingModule({
  
      imports: [HttpClientTestingModule]

    }));

  it('should be created', () => {
    const service: ForgotPassService = TestBed.get(ForgotPassService);
    expect(service).toBeTruthy();
  });
});
