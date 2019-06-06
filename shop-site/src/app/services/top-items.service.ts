import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class TopItemsService {

  constructor(private http:HttpClient) { }

  getVideoAndFoto(){
  	const promise = new Promise<Object>((resolve,reject) => {
  		this.http.get('http://localhost:8000/home/video',{'headers':{'Content-Type':'application/json',}})
  		.subscribe( res => {
  			resolve(res)
  		}, err => {
  			console.log(err);
  			resolve(false);
  		})
  	}) 
  	return promise;
  }

  getAudio(){
  	const promise = new Promise<Object>((resolve,reject) => {
  		this.http.get('http://localhost:8000/home/audio',{'headers':{'Content-Type':'application/json',}})
  		.subscribe( res => {
  			resolve(res)
  		}, err => {
  			console.log(err);
  			resolve(false);
  		})
  	}) 
  	return promise;
  }


    getNetwork(){
    const promise = new Promise<Object>((resolve,reject) => {
      this.http.get('http://localhost:8000/home/network',{'headers':{'Content-Type':'application/json',}})
      .subscribe( res => {
        resolve(res)
      }, err => {
        console.log(err);
        resolve(false);
      })
    }) 
    return promise;
  }


  getTv(){
    const promise = new Promise<Object>((resolve,reject) => {
      this.http.get('http://localhost:8000/home/tv',{'headers':{'Content-Type':'application/json',}})
      .subscribe( res => {
        resolve(res)
      }, err => {
        console.log(err);
        resolve(false);
      })
    }) 
    return promise;
  }


}
