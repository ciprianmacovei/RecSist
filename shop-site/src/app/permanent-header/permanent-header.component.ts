import { Component, OnDestroy, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../services/comunication.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
	selector: 'app-permanent-header',
	templateUrl: './permanent-header.component.html',
	styleUrls: ['./permanent-header.component.css']
})
export class PermanentHeaderComponent implements OnDestroy, OnInit, AfterViewInit, AfterViewChecked {

	public userName: String;
	public showLoginPannel: Number;
	public subscription: Subscription;
	public subscription2: Subscription;
	public basketItemBoolean: Boolean;
	public basketItemBuy = [];
	public basketItemButNames: Array<String> = [];
	public itemList: String;

	constructor(private auth: AuthenticationService, private router: Router, private comm: ComunicationService) {
		this.loginPanelName();
		this.buyPanelItem();

	}

	ngOnInit() {
		// this.ShoppingListItem();

	}

	ngAfterViewInit() {

	}

	ngAfterViewChecked() {
		// localStorage.clear();
	}


	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	logOut(event) {
		this.auth.logout();
		this.router.navigate(['login']);
		event.path[3].style.display = "none";
	}

	loginPanelName() {
		this.showLoginPannel = sessionStorage.length;
		if (sessionStorage.length != 0) {
			this.userName = JSON.parse(sessionStorage.currentUser).user;
		}
	}

	buyPanelItem() {
		this.subscription = this.comm.getObject().subscribe((res) => {
		this.basketItemBoolean = res.data.data;
			this.basketItemBuy.push(res.data.item);
			this.basketItemButNames.push(res.data.numeprodus)
			sessionStorage.setItem('basketItem', 'true');
			sessionStorage.setItem('buyArray', this.basketItemBuy.toString())
			sessionStorage.setItem('buyArrayNames', this.basketItemButNames.toString())
			this.basketItemBuy = sessionStorage.getItem('buyArray').split(',')
		})
		this.basketItemBoolean = sessionStorage.getItem('basketItem') === 'true';
		if (sessionStorage.getItem('buyArray')) {
			this.basketItemBuy = sessionStorage.getItem('buyArray').split(',');
		}

	}

	emptryBasket(event) {
		location.reload();
		sessionStorage.setItem('basketItem', 'false');
		event.path[1].style.display = 'none';
		sessionStorage.removeItem('buyArray')
		this.itemList = '';
		this.basketItemBuy = [];
	}

	goBasket() {
		this.router.navigate(['itemBasket']);
	}


}
