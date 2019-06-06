import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
@Component({
  selector: 'app-auto-moto',
  templateUrl: './auto-moto.component.html',
  styleUrls: ['./auto-moto.component.css']
})
export class AutoMotoComponent implements OnInit {

	public itemsOferte:any;

  constructor(private item:ItemsService) {
  	item.getItemsOferte('autoMoto').then(res => {
  		this.itemsOferte = item.itemsOferte;
  	console.log(this.itemsOferte);
  		

  	}).catch(err => {
  		console.log(err);
  	})
  }

  ngOnInit() {

  }

}
