/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
       AuthenticationService
      ],
    });
  });

  it('should ...', async(inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  })));

  it(`should issue a request`,
  async(
    inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
      // 3. send a simple request
      const Email = 'asdsa';
      const Password = 'asdsadsadsa';

      http.post('http://localhost:8000/login', {Email, Password}).subscribe();

    
      backend.expectOne({
        url: 'http://localhost:8000/login',
        method: 'POST'
      });
    })
  )
);
  

it(`should send an expected login request`,
  async(inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
    const Email = 'asdsa';
    const Password = 'asdsadsadsa';

    http.post('http://localhost:8000/login', {Email: Email, Password: Password}).subscribe();

    backend.expectOne((req: HttpRequest<any>) => {

      return req.url === 'http://localhost:8000/login'
        && req.method === 'POST'
        && req.body.Email === 'asdsa'
        && req.body.Password === 'asdsadsadsa';
    }, `POST to '/login' with form-encoded Email and Password`);

})));


  it('return true for login user', inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
    const email = 'asdasdasdsadxzvxda';
    const password = 'asdas';

    console.log('muie');
    const userService = getTestBed().get(AuthenticationService);
    userService.login(email, password).then(
      (res) => {
        expect(res).toEqual(null);
      }
    );

    const req = httpMock.expectOne('http://localhost:8000/login');
    expect(req.request.method).toEqual('POST');

    req.flush({ Email: email, Password: password });
    httpMock.verify();
  }));
});
