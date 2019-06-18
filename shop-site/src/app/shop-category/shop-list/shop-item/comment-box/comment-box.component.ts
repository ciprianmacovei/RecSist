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



 
  getParamId(){
  	this.activeRouter.params.subscribe( params => {this.id=params.id;})
  }
}
