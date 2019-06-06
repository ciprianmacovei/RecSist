import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../../services/items.service';
import { ComunicationService } from '../../../../services/comunication.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';



@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBox implements OnInit {

public id:any;
public arrayOfComments:any;
public text:string;

  constructor(private item:ItemsService,private activeRouter:ActivatedRoute,private zone:NgZone) {
  	this.getParamId();
  	this.getReviewsForItem();
  }
  
  ngOnInit() { }

  getReviewsForItem(){
  	this.item.getItem(this.id).then(res => {
      console.log(res)
      if (Object.keys(res)[0] == 'reviews')
      this.arrayOfComments = res[Object.keys(res)[0]]
      else this.arrayOfComments = res[Object.keys(res)[1]]
    });
  }


  postReviewsForItem(){
    console.log(JSON.parse(sessionStorage.getItem("currentUser")).reviewerID,'asdasdsadsadsadas')
      let reviewerID = JSON.parse(sessionStorage.getItem("currentUser")).reviewerID;
      let reviewerName = JSON.parse(sessionStorage.getItem("currentUser")).user;
      this.item.postComment(reviewerName,reviewerID,this.id,this.text);
      location.reload();
  }
 
  getParamId(){
  	this.activeRouter.params.subscribe( params => {this.id=params.id;})
  }
}
