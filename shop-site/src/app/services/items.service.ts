import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ItemsService {

	public options:any;
	public item:any;
  public itemsOferte:any;
  public usersComments:any;

  constructor(private http:HttpClient,private toastr:ToastrService) { }


  getItem(id){
  	var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
    headers:headers
    }
  	const promise = new Promise<Object>((resolve,reject) => {
  		this.http.get('http://localhost:8000/itemDetails/'+id,this.options)
  		.subscribe( res => {
  			console.log('asdasdas ciprian macovei', res);
  			
  			resolve(res)
  		}, err => {
  			console.log(err);
  			resolve(false);
  		})
  	});
  	return promise;
  }
  getItemDetails(id) {
  	var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
    	headers:headers
    }
  	return this.http.get('http://localhost:8000/itemDetails/'+id,this.options);
  }

  buyItem(id){
  	var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
    headers:headers
    }
    const promise = new Promise<Boolean>((resolve,reject) => {
    	this.http.post('http://localhost:8000/itemDetails/'+id,this.options)
    	.subscribe( res => {
    		console.log(res);
    		resolve(true);
    	}, err => {
    		console.log(err);
    		resolve(false);
    	})
    })
    return promise;
  }


  buyItems(items){
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
    headers:headers
    };
    return new Promise<Boolean>((resolve,reject) => {
      this.http.post('http://localhost:8000/buyItems',items,this.options)
      .subscribe( res => {
        console.log(res);
        resolve(true);
        this.toastr.success('Items BucketList', 'Purchace Complete');
      }, err => {
        console.log(err);
        resolve(false);
      })
    });
  };


  getItemsOferte(url){
    var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this.options = {
    headers:headers
    };
    return new Promise<Boolean>((resolve,reject) => {
      this.http.get('http://localhost:8000/home/'+url,this.options)
      .subscribe( res => {
        this.itemsOferte = res[Object.keys(res)[0]];
        resolve(true);
      }, err => {
        console.log(err);
        resolve(false);
      })
    });
  }



  rateItem(id,rate){
    if (sessionStorage.getItem('currentUser')){
      var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.options = {
      headers:headers
      };
      let obj = {
        rate:rate,
        username: JSON.parse(sessionStorage.getItem('currentUser')).user
        // name:localStorage.getItem()
      };
      console.log('obiectul vietii',obj);
        return new Promise<Object>((resolve,reject) => {
        this.http.post('http://localhost:8000/rateItem/'+id,obj,this.options)
        .subscribe( res => {
          resolve(res);
        }, err => {
          console.log(err);
          resolve(false);
        })
      });
    }

}



    postComment(reviewerName,reviewerID,prodId,reviewText){
      if (sessionStorage.getItem('currentUser')){
      var headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.options = {
      headers:headers
      };

      let obj = {
        reviewerID,
        reviewerName,
        reviewText
      };

      const promise = new Promise<Object>((resolve,reject) => {
        this.http.post('http://localhost:8000/itemDetails/'+prodId,obj,this.options)
        .subscribe( res => {
          resolve(true);
        }, err => {
          console.log(err);
          resolve(false);
        })
      })
      return promise;
    }

  }


}
