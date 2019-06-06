import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PaginationService {

	public options:any;
	public items:object;
  public _page:number = 1;
  public pageSize:number = 6;
  public totalItems:number = 0;

  constructor(private http:HttpClient) { }


  get startIndex(){
    return this.page * this.pageSize;
  }


  get totalPages(){
    try{
      return Math.ceil(this.totalItems/this.pageSize);
    }
    catch(e){
      console.log('erroarea',e)
      return 0;
    }
  }

  get page():number{
    return this._page;
  }


  set page(val:number){
    if (val != this.page){
      this._page = val;
    }
    console.log('Sunt in set page!!!!');
  }


  getItems(){
     var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.options = {
      headers:headers
      }
    const promise = new Promise((resolve,reject)=>{
     
      this.http.get('http://localhost:8000/home',this.options)
      .subscribe( res => {
        this.items = res[Object.keys(res)[0]];
        resolve(this.items);
      }, err => {
        console.log(err);
      })
    })
    return promise;
  }


  getItemsQuery(start,end){
     var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.options = {
      headers:headers
      }
    const promise = new Promise<Object>((resolve,reject)=>{
     
      this.http.get('http://localhost:8000/home/:'+start+'/'+':'+end,this.options)
      .subscribe( res => {
        this.items = res[Object.keys(res)[0]];
        resolve(this.items);
      }, err => {
        console.log(err);
      })
    })
    return promise;
  }
}

