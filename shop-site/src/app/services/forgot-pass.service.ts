import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  private options:any;

  constructor(private http:HttpClient) { }

  getPass(pass:string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
      headers
    }
    const promise = new Promise((resolve, reject) => {
      this.http.post('http://localhost:8000/getPass',{pass:pass},this.options)
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
    return promise;
  }
}
