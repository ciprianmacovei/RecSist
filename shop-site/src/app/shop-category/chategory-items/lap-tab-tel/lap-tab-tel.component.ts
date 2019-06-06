import { Component, OnInit } from '@angular/core';
import { TopItemsService } from '../../../services/top-items.service'


@Component({
  selector: 'app-lap-tab-tel',
  templateUrl: './lap-tab-tel.component.html',
  styleUrls: ['./lap-tab-tel.component.css']
})
export class LapTabTelComponent implements OnInit {

  private arrayOfItems:any;

  constructor(private rec:TopItemsService) {

  	this.rec.getNetwork().then( res => this.arrayOfItems = res[Object.keys(res)[0]]);
  }

  ngOnInit() {
  }
}
