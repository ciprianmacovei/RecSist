import { Component, OnDestroy, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../services/comunication.service';
import { Subscription } from 'rxjs/Subscription';
import {ItemsService} from "../services/items.service";


@Component({
	selector: 'app-user-pannel',
	templateUrl: './user-pannel.component.html',
	styleUrls: ['./user-pannel.component.css']
})
export class UserPannelComponent implements OnInit,OnDestroy {

	public userName: String;
	public showLoginPannel: Number;
	public subscription: Subscription;
	public basketItemBoolean: Boolean;
	public basketItemBuy = [];
	public itemList: String;


	constructor(private auth: AuthenticationService, private router: Router, private comm: ComunicationService,private item:ItemsService) {
		this.loginPanelName();
		this.buyPanelItem();

	}

	ngOnInit() {

	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	logOut(event) {
		this.auth.logout();
		this.router.navigate(['home']);
		event.path[3].style.display = "none";
	}

	loginPanelName() {
		console.log('sesiune de login', typeof (sessionStorage.getItem('currentUser')), sessionStorage.length)
		this.showLoginPannel = sessionStorage.length;
		if (sessionStorage.length != 0) {
			this.userName = JSON.parse(sessionStorage.currentUser).user;
		}
	}

	buyPanelItem() {
		this.subscription = this.comm.getObject().subscribe((res) => {
			console.log(res, 'macovei ciprian fii pe faza');

			if (res.data.data === 1) {
				this.basketItemBuy.splice(0, 1);
				console.log(this.basketItemBuy, '@@@@@@@@@@@@@@@@@@@');
				if (this.basketItemBuy.length === 0) {
					sessionStorage.removeItem('buyArray');
					sessionStorage.removeItem('buyArrayNames');
					this.basketItemBoolean = false;
				}
				sessionStorage.setItem('buyArray', this.basketItemBuy.toString())
				this.basketItemBuy = sessionStorage.getItem('buyArray').split(',')
			}
			else {
				this.basketItemBoolean = res.data.data;
				this.basketItemBuy.push(res.data.item);
				sessionStorage.setItem('basketItem', 'true');
				sessionStorage.setItem('buyArray', this.basketItemBuy.toString())
				this.basketItemBuy = sessionStorage.getItem('buyArray').split(',')
			}
		})
		this.basketItemBoolean = sessionStorage.getItem('basketItem') === 'true';
		if (sessionStorage.getItem('buyArray')) {
			this.basketItemBuy = sessionStorage.getItem('buyArray').split(',');
		}
	}

	emptryBasket(event) {
		sessionStorage.setItem('basketItem', 'false');
		event.path[1].style.display = 'none';
		sessionStorage.removeItem('buyArray');
		this.itemList = '';
		this.item.emptyItemsToArray();
		this.basketItemBuy = [];

	}

	goBasket() {
		this.router.navigate(['itemBasket']);
	}

}
