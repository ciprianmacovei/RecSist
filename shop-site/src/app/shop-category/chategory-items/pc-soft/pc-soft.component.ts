import { Component, OnInit } from '@angular/core';
import { TopItemsService } from '../../../services/top-items.service'

@Component({
  selector: 'app-pc-soft',
  templateUrl: './pc-soft.component.html',
  styleUrls: ['./pc-soft.component.css']
})
export class PcSoftComponent implements OnInit {

private arrayOfItems:any;

  constructor(private rec:TopItemsService) {
  	this.rec.getVideoAndFoto().then( res => this.arrayOfItems = res[Object.keys(res)[0]]);
  }


 

  ngOnInit() {
  }


}