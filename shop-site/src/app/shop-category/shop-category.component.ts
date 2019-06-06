import { Component, OnInit, Input } from '@angular/core';
import { ChategoryItemsComponent } from './chategory-items/chategory-items.component';
import { PaginationService } from '../services/pagination.service';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.css']
})
export class ShopCategoryComponent implements OnInit {
	
	private pagina:number;
	private totalPagini:number;
  private carouselBoolean:Boolean = true;

  constructor(private pageS:PaginationService,private active:Router) {
  	this.pagina = this.pageS.page;
    this.totalPagini = this.pageS.totalPages;
    this.showCarousel();
    

  }

  showCarousel(){
    this.active.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.active.url === '/home/video' || this.active.url === '/home/audio' || this.active.url === '/home/network' || this.active.url === '/home/tv'){
          this.carouselBoolean = false;
        }
        else this.carouselBoolean = true;
      }
    });
  }

  ngOnInit() {
  }

}
