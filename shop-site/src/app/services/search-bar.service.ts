import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchBarService {
	public options:any;
	baseUrl: string = 'http://localhost:8000/';
	queryUrl: string = 'search=';

  constructor(private http:HttpClient) {
  
  }



  search(terms: Observable<string>) {

    return terms.debounceTime(0)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
  	if (term.length != 0){
	  	this.options = {
	    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
	    }
	    return this.http
	        .get(this.baseUrl + this.queryUrl + term)
    }
        // .map(res => {res=JSON.parse(JSON.stringify(res))

        // 			});

    //   const promise = new Promise<Object>((resolve,reject)=>{
     
    //   this.http.get(this.baseUrl + this.queryUrl + term,this.options)
    //   .subscribe( res => {
    //     resolve(res);
    //   }, err => {
    //     console.log(err);
    //   })
    // })
    // return promise;
  }




  // searchItems(item){
  // 	let headers  = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  //   this.options = {
  //   headers:headers
  //   }
  // 	const promise = new Promise<Object>(
  // 		(resolve,reject)=>{

  // 			this.http.post('http://localhost:4200/searchItems',this.options,item)
  // 						.subscribe( (res) => {
  // 							resolve(res);
  // 						},
  // 						(err) => {
		// 					console.log(err)  							
  // 						})
  // 		})
  // }
  
 }


