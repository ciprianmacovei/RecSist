import { Component, OnInit } from '@angular/core';
import { ComunicationService } from '../../../services/comunication.service';
import { ItemsService } from '../../../services/items.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import $ from 'jquery';

@Component({
	selector: 'app-item-basket',
	templateUrl: './item-basket.component.html',
	styleUrls: ['./item-basket.component.css']
})
export class ItemBasketComponent implements OnInit {

	private backetItems: any;
	private totalBasketItems: number;

	constructor(private toastr: ToastrService, private nav: Router, private comm: ComunicationService, private is: ItemsService) {
		this.boughtItems();

		console.log(this.backetItems,'muie');
	}

	ngOnInit() {
		this.totalBasketItems = this.backetItems.length;
	}

	deleteThisItem(e) {
			this.totalBasketItems--;
			$(e.path[1]).hide();
			this.comm.sendObject({data:1});
			if (this.totalBasketItems === 0){
				this.backetItems = [];
			}
	}

	pannelFlaseOrTrue(){
		return this.backetItems.length !== 0;
	}

	boughtItems() {

		sessionStorage.getItem('buyArrayNames') ? this.backetItems = sessionStorage.getItem('buyArrayNames').split(',') : this.backetItems = [];
		
	}

	purchaceItems(event) {
		this.toastr.success('Items BucketList', 'Purchace Complete'); // nu se vede 
		this.is.buyItems(this.backetItems);
		sessionStorage.setItem('basketItem', 'false');
		console.log(event)
		sessionStorage.removeItem('buyArray')
		let self = this;
		setTimeout(function () {
			self.nav.navigate(['home']);
			location.reload();
		}, 500)


	}

}
