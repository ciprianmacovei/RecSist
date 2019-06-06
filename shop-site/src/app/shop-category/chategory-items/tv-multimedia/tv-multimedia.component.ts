import { Component, OnInit } from '@angular/core';
import { TopItemsService } from '../../../services/top-items.service'

@Component({
  selector: 'app-tv-multimedia',
  templateUrl: './tv-multimedia.component.html',
  styleUrls: ['./tv-multimedia.component.css']
})
export class TvMultimediaComponent implements OnInit {

private arrayOfItems:any;

  constructor(private rec:TopItemsService) {

  	this.rec.getTv().then( res => this.arrayOfItems = res[Object.keys(res)[0]]);
  }

  ngOnInit() {
  }

}
