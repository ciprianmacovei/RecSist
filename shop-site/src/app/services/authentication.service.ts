import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Item } from '../shop-category/shop-list/item.model';
import {Subject} from "rxjs";

@Injectable()
export class AuthenticationService {
  public token: String;
  public authUser: User;
  public headers: HttpHeaders;
  public options: any;
  public itemsArray: any = {};
  public logoutService = new Subject<boolean>();

  constructor(private http: HttpClient) {
    // set Token if saved in local storage ... not to login everytime :-?? tr sa decomentezi asta

    //	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //	this.authUser = currentUser;
    //	this.token = currentUser.token;

  }

  login(Email: String, Password: String) {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
      headers: this.headers
    };

    return  new Promise<boolean>((resolve, reject) => {
      const user = new User();
      user.Email = Email;
      user.Password = Password;
      this.http.post('http://localhost:8000/login', user, this.options)
        .subscribe(res => {
          if (res[Object.keys(res)[0]] == true) {
            // this.token = res.token;
            sessionStorage.setItem('currentUser', JSON.stringify(res));
            resolve(true);
          }
          else if (res[Object.keys(res)[0]] == false) {
            resolve(false);
          }
          console.log(res);
        }, err => {
          reject(err);
        })
    });
  }

  register(Email: String, Password: String) {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
      headers: this.headers
    }
    const promise = new Promise<boolean>((resolve, reject) => {
      const user = new User();
      user.Email = Email;
      user.Password = Password;
      this.http.post<User>('http://localhost:8000/register', user, this.options)
        .subscribe(res => {
          console.log(res);
          resolve(true);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
    return promise;
  }

  logout() {
    const promise = new Promise<Boolean>((resolve, reject) => {
      try {
        this.logoutService.next(true);
        sessionStorage.clear();
        localStorage.clear();
        resolve(true);
      } catch (err) {
        resolve(false);
        console.log(err);
      }
    });
    return promise;
  }


  getItems() {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
      headers: this.headers
    }
    const promise = new Promise<Boolean>((resolve, reject) => {

      this.http.get('http://localhost:8000/home', this.options)
        .subscribe(res => {
          this.itemsArray = res[Object.keys(res)[0]];
          resolve(true);
        }, err => {
          console.log(err);
          resolve(false);
        })
    })
    return promise;
  }



  showPassword(id) {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
      headers: this.headers
    }
    const promise = new Promise<any>((resolve, reject) => {
      let obj = {
        id: id
      }
      this.http.post('http://localhost:8000/showPassword', obj, this.options)
        .subscribe(res => {
          resolve(res);
        }, err => {
          console.log(err);
          resolve(false);
        })
    })
    return promise;
  }




  changePassword(id, pass) {
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
      headers: this.headers
    }
    const promise = new Promise((resolve, reject) => {
      let obj = {
        id: id,
        pass: pass
      }
      this.http.post('http://localhost:8000/changePassword', obj, this.options)
        .subscribe(res => {
          resolve(true);
        }, err => {
          console.log(err);
          resolve(false);
        })
    })
    return promise;
  }
}
