import { Component, OnInit } from '@angular/core';
import { TopItemsService } from '../../../services/top-items.service'

@Component({
  selector: 'app-elect-clim',
  templateUrl: './elect-clim.component.html',
  styleUrls: ['./elect-clim.component.css']
})
export class ElectClimComponent implements OnInit {

  private arrayOfItems:any;

  constructor(private rec:TopItemsService) {

  	this.rec.getAudio().then( res => this.arrayOfItems = res[Object.keys(res)[0]]);
  }

  ngOnInit() {
  }

}
