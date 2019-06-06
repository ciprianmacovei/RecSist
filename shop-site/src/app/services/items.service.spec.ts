import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { ItemsService } from './items.service';
import { HttpClient } from '@angular/common/http';

describe('ItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsService],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()]
    });
  });


  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));


  it('should be created', inject([ItemsService], (service: ItemsService) => {
    expect(service).toBeTruthy();
  }));

  it('return 1 item and top3 comments', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
   const userId = 'B000065BP9';

    const userService = getTestBed().get(ItemsService);
    userService.getItem(userId).then(
      res => {
        if (res['items'] && res['reviews']) {
        expect(res['items'].length).toBe(1);
        expect(res['reviews'].length).toEqual(3);
      }
    });

    const req = httpMock.expectOne('http://localhost:8000/itemDetails/' + userId);
    expect(req.request.method).toEqual('GET');

    req.flush(userId);
    httpMock.verify();
  }));


});
