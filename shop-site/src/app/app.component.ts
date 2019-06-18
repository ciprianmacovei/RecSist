import { Component, OnDestroy,OnInit,AfterViewChecked,AfterViewInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { ComunicationService } from './services/comunication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy,OnInit,AfterViewInit,AfterViewChecked{

	public userName:String;
	public showLoginPannel:Number;
	public subscription:Subscription;
	public subscription2:Subscription;
	public basketItemBoolean:Boolean;
	public basketItemBuy = [];
	public itemList:String;
	public navbar:any;
	
	constructor(private auth:AuthenticationService,private router:Router,private comm:ComunicationService){
    this.loginPanelName();
		this.buyPanelItem();
		this.navbar = sessionStorage.length!=1;
	}

	ngOnInit(){

	}

	ngAfterViewInit(){

	}

	ngAfterViewChecked(){
	}


	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	loginPanelName(){
		this.showLoginPannel = sessionStorage.length;
		if (sessionStorage.length!=0){
		this.userName = JSON.parse(sessionStorage.currentUser).user;
		}
	}

	buyPanelItem(){
		this.subscription = this.comm.getObject().subscribe( (res) => {this.basketItemBoolean = res.data.data;
																		this.basketItemBuy.push(res.data.item);
																		sessionStorage.setItem('basketItem','true');
																		sessionStorage.setItem('buyArray',this.basketItemBuy.toString());
																		this.basketItemBuy = sessionStorage.getItem('buyArray').split(',')
																		});
		this.basketItemBoolean = sessionStorage.getItem('basketItem') === 'true';
		if (sessionStorage.getItem('buyArray'))
		{
			this.basketItemBuy = sessionStorage.getItem('buyArray').split(',');
		}
	
	}

	emptryBasket(event){
		location.reload();
		sessionStorage.setItem('basketItem','false');
		event.path[1].style.display = 'none';
		sessionStorage.removeItem('buyArray')
		this.itemList = '';
		this.basketItemBuy = [];
	}

	goBasket(){
		this.router.navigate(['itemBasket']);
	}

}
