import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../../services/items.service';
import { ComunicationService } from '../../../../services/comunication.service';
import { RecommenderService } from '../../../../services/recommender.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';


interface recomandationAndComments {
  item:any[],
  reviews:any[]
}

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  public filtersLoaded: Promise<boolean>;
  public spinnerBoolean:Boolean = true;
	public idNumber:Number;
	public selectedItem;
	public basketItem:Boolean;
	public buyingList = [];
  public quantity:any;
  public recommendedItems:any;
  public arrayOfComments:any;
  public text:string;


  constructor(private ts:ToastrService,
              private activateRoutes:ActivatedRoute,
              private itemAuth:ItemsService,
              private comm:ComunicationService,
              private rec:RecommenderService,
              private item:ItemsService) {
    this.getParamId();
  	this.getSelectedItem();
    this.getRecommendedItems(this.idNumber)
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

  rating(e){
    this.SetRatingStar(e);
  }  

  SetRatingStar(event){
    $('input.rating-value').val($(event.path[0]).attr('value'));
    return $('.stea').each(function() {
    if (parseInt($('.rating-value').val()) >= parseInt($(this).attr('value'))) {
      $(this).addClass('rating-selected');
      $(this).html('&#9733;');
    } 
    else
    {
      $(this).removeClass('rating-selected');
      $(this).html('&#9734;');
    }

      });
  }

  sendRateItem(){
    if ($('.rating-value').val() != 0){
      this.itemAuth.rateItem(this.idNumber,$('.rating-value').val()).then( res => {
        if (res == false){
          this.ts.error('User has allready rated this item','Item Rated');
        }
        else {
          this.ts.success('You have succesfuly rated this item','Item Rated');
        }
      })
    }
    else {
      this.ts.error('Please select how many starts before you rate','Item Rated');
    }
  }

  getRecommendedItems(id){
    this.rec.getRecommendedItem(id)
            .then(res => {this.rec.getItems(res)
              .then( (res:any) => {
                  this.recommendedItems = res.items
              }
    )})
  }

  getParamId(){
    this.activateRoutes.params.subscribe( params => {this.idNumber=params.id;})
  }

  getSelectedItem(){
  	this.itemAuth.getItem(this.idNumber).then((res:recomandationAndComments) => {
            this.selectedItem = res.item[0];
            this.quantity = res.item[0].number;
            this.filtersLoaded = Promise.resolve(true);
            this.arrayOfComments = res.reviews;
            this.spinnerBoolean = false;
            this.boughtItemsList()
    });
  }


  boughtItemsList() {
    let numberOfProducts:string[] = sessionStorage.getItem('buyArray') ? sessionStorage.getItem('buyArray').split(',') : [];
    this.quantity = this.quantity - numberOfProducts.length;
  }


  buyProduct(event){
      if (this.quantity != 0){

        if (sessionStorage.getItem('basketItem') == 'false' && sessionStorage.getItem('buyArray') != null ){
          location.reload();
        }
      	this.basketItem = true;
        localStorage.setItem('buyBucketList',''+this.buyingList);
        this.comm.sendObject({data:true,item:this.selectedItem.asin,numeprodus:this.selectedItem.nume});
        this.quantity = this.quantity - 1;
      }
      else {

        this.ts.error('ItemsList','There are not enough items in the shop');
      }
  }

  postReviewsForItem(){
    let date =new Date();
    let day = date.getDay() < 10 ? '0'+date.getDay() : date.getDay(),
        month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth();

    let timeOfTheReview = day + ' ' + month + ', '+date.getFullYear(),
        reviewerID = JSON.parse(sessionStorage.getItem("currentUser")).reviewerID,
        reviewerName = JSON.parse(sessionStorage.getItem("currentUser")).user;

    this.arrayOfComments.unshift({reviewerName,summary:this.text,reviewTime:timeOfTheReview});
    this.item.postComment(reviewerName,reviewerID,this.idNumber,this.text);
  }

}
